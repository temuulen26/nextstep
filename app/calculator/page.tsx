"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { getStoredAuthUser } from "@/lib/auth";
import { useGpa, type CourseRow, type SemesterRow } from "@/lib/hooks/useGpa";
import { useBanner } from "@/lib/hooks/useBanner";
import { CourseTable } from "@/components/calculator/CourseTable";
import { SemesterTable } from "@/components/calculator/SemesterTable";
import { GPASummary } from "@/components/calculator/GPASummary";
import { Banner } from "@/components/calculator/Banner";

export default function CalculatorPage() {
  const [role, setRole] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<CourseRow, "id">>({
    code: "",
    name: "",
    goal: "",
    worst: "",
    expectation: "",
    final: "",
  });
  const [semesterDraft, setSemesterDraft] = useState<Omit<SemesterRow, "id">>({
    yearStart: "",
    yearEnd: "",
    season: "",
    classIndex: "",
    className: "",
    finalGpa: "",
  });

  const {
    rows,
    semesterRows,
    summaryGpa,
    error,
    addRow: handleAddRow,
    updateRow: handleUpdateRow,
    updateRowLocal,
    removeRow: handleRemoveRow,
    addSemesterRow: handleAddSemesterRow,
    removeSemesterRow: handleRemoveSemesterRow,
  } = useGpa();

  const {
    bannerMessage,
    bannerDraft,
    bannerLoading,
    bannerSaving,
    bannerError,
    setBannerDraft,
    saveBanner,
  } = useBanner();

  const yearRanges = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, index) => {
      const start = currentYear - 1 - index;
      const end = start + 1;
      return {
        value: `${start}-${end}`,
        label: `${start} - ${end}`,
        start,
        end,
      };
    });
  }, []);

  useEffect(() => {
    const user = getStoredAuthUser();
    setRole(user?.role ?? null);
  }, []);

  const updateDraft = useCallback(
    (key: keyof Omit<CourseRow, "id">, value: string) => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateSemesterDraft = useCallback(
    (key: keyof Omit<SemesterRow, "id">, value: string) => {
      setSemesterDraft((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateRow = useCallback(
    (index: number, key: keyof CourseRow, value: string) => {
      updateRowLocal(index, { [key]: value });
    },
    [updateRowLocal]
  );

  const addRow = useCallback(async () => {
    if (!draft.code.trim() || !draft.name.trim()) {
      return;
    }
    try {
      await handleAddRow(draft);
      setDraft({
        code: "",
        name: "",
        goal: "",
        worst: "",
        expectation: "",
        final: "",
      });
    } catch (err) {
      // Error is handled by the hook
    }
  }, [draft, handleAddRow]);

  const saveRow = useCallback(
    async (row: CourseRow) => {
      await handleUpdateRow(row);
    },
    [handleUpdateRow]
  );

  const addSemesterRow = useCallback(async () => {
    if (
      !semesterDraft.yearStart.trim() ||
      !semesterDraft.yearEnd.trim() ||
      !semesterDraft.season.trim()
    ) {
      return;
    }
    try {
      await handleAddSemesterRow(semesterDraft);
      setSemesterDraft({
        yearStart: "",
        yearEnd: "",
        season: "",
        classIndex: "",
        className: "",
        finalGpa: "",
      });
    } catch (err) {
      // Error is handled by the hook
    }
  }, [semesterDraft, handleAddSemesterRow]);

  const handleSaveBanner = useCallback(async () => {
    if (role !== "ADMIN") {
      return;
    }
    await saveBanner();
  }, [role, saveBanner]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,237,214,0.7),transparent_55%),radial-gradient(circle_at_bottom,rgba(255,189,136,0.5),transparent_50%)]" />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />

      <section className="relative container py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            GPA Tracker
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Голч дүн тооцоологч
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Оюутан та дүнгээ тооцоолоно уу...
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <CourseTable
              rows={rows}
              draft={draft}
              onUpdateDraft={updateDraft}
              onAddRow={addRow}
              onUpdateRow={updateRow}
              onSaveRow={saveRow}
              onRemoveRow={handleRemoveRow}
            />

            <SemesterTable
              rows={semesterRows}
              draft={semesterDraft}
              yearRanges={yearRanges}
              onUpdateDraft={updateSemesterDraft}
              onAddRow={addSemesterRow}
              onRemoveRow={handleRemoveSemesterRow}
            />
          </div>

          <aside className="space-y-6">
            <GPASummary summaryGpa={summaryGpa} error={error} />

            <div className="space-y-4 text-sm text-slate-600">
              <Banner
                message={bannerMessage}
                loading={bannerLoading}
                saving={bannerSaving}
                error={bannerError}
                isAdmin={role === "ADMIN"}
                draft={bannerDraft}
                onDraftChange={setBannerDraft}
                onSave={handleSaveBanner}
              />

              <div className="rounded-2xl bg-orange-50/70 p-4">
                <p className="font-semibold text-slate-800">Зорилго</p>
                <p className="mt-2">
                  Төсөөлж буй хамгийн бага болон зорилтот дүнгээ оруулаад бодитоор харьцуул.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900 text-white p-4">
                <p className="font-semibold">Сануулах нь</p>
                <p className="mt-2 text-slate-200">
                  Хүснэгтийн утгуудыг өөрчилмөгц дундаж автомат шинэчлэгдэнэ.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
