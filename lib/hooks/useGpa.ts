import { useEffect, useState, useCallback } from "react";
import { fetchJson, postJson, putJson, deleteJson } from "@/lib/api";
import { getStoredAuthUser } from "@/lib/auth";

export type CourseRow = {
  id?: number;
  code: string;
  name: string;
  goal: string;
  worst: string;
  expectation: string;
  final: string;
};

export type SemesterRow = {
  id?: number;
  yearStart: string;
  yearEnd: string;
  season: string;
  classIndex: string;
  className: string;
  finalGpa: string;
};

export type SummaryGpa = {
  goal: string;
  worst: string;
  expectation: string;
  final: string;
};

export function useGpa() {
  const [rows, setRows] = useState<CourseRow[]>([]);
  const [semesterRows, setSemesterRows] = useState<SemesterRow[]>([]);
  const [summaryGpa, setSummaryGpa] = useState<SummaryGpa>({
    goal: "0.00",
    worst: "0.00",
    expectation: "0.00",
    final: "0.00",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSummary = useCallback(async () => {
    const user = getStoredAuthUser();
    if (!user?.token) {
      return;
    }
    try {
      const data = await fetchJson<{
        goalGpa?: number;
        worstGpa?: number;
        expectationGpa?: number;
        finalGpa?: number;
      }>("/gpa/summary", { token: user.token });

      setSummaryGpa({
        goal:
          typeof data.goalGpa === "number" ? data.goalGpa.toFixed(2) : "0.00",
        worst:
          typeof data.worstGpa === "number" ? data.worstGpa.toFixed(2) : "0.00",
        expectation:
          typeof data.expectationGpa === "number"
            ? data.expectationGpa.toFixed(2)
            : "0.00",
        final:
          typeof data.finalGpa === "number" ? data.finalGpa.toFixed(2) : "0.00",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    }
  }, []);

  const loadData = useCallback(async () => {
    const user = getStoredAuthUser();
    if (!user?.token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [rowsData, summaryData, semestersData] = await Promise.all([
        fetchJson<Array<Record<string, string | number | null>>>("/gpa", {
          token: user.token,
        }),
        fetchJson<{
          goalGpa?: number;
          worstGpa?: number;
          expectationGpa?: number;
          finalGpa?: number;
        }>("/gpa/summary", { token: user.token }),
        fetchJson<Array<Record<string, string | number | null>>>(
          "/gpa/semesters",
          { token: user.token }
        ),
      ]);

      const mapped = rowsData.map((row) => ({
        id: Number(row.id),
        code: String(row.code ?? ""),
        name: String(row.name ?? ""),
        goal: row.goal ? String(row.goal) : "",
        worst: row.worst ? String(row.worst) : "",
        expectation: row.expectation ? String(row.expectation) : "",
        final: row.finalScore ? String(row.finalScore) : "",
      }));

      const semesterMapped = semestersData.map((row) => ({
        id: Number(row.id),
        yearStart: row.yearStart != null ? String(row.yearStart) : "",
        yearEnd: row.yearEnd != null ? String(row.yearEnd) : "",
        season: row.season ? String(row.season) : "",
        classIndex: row.classIndex ? String(row.classIndex) : "",
        className: row.className ? String(row.className) : "",
        finalGpa: row.finalGpa != null ? String(row.finalGpa) : "",
      }));

      setRows(mapped);
      setSemesterRows(semesterMapped);
      setSummaryGpa({
        goal:
          typeof summaryData.goalGpa === "number"
            ? summaryData.goalGpa.toFixed(2)
            : "0.00",
        worst:
          typeof summaryData.worstGpa === "number"
            ? summaryData.worstGpa.toFixed(2)
            : "0.00",
        expectation:
          typeof summaryData.expectationGpa === "number"
            ? summaryData.expectationGpa.toFixed(2)
            : "0.00",
        final:
          typeof summaryData.finalGpa === "number"
            ? summaryData.finalGpa.toFixed(2)
            : "0.00",
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }, []);

  const addRow = useCallback(
    async (draft: Omit<CourseRow, "id">) => {
      const user = getStoredAuthUser();
      if (!user?.token) {
        throw new Error("Нэвтэрч орно уу.");
      }

      const created = await postJson<{
        id: number;
        code: string;
        name: string;
        goal?: string | null;
        worst?: string | null;
        expectation?: string | null;
        finalScore?: string | null;
      }>(
        "/gpa",
        {
          code: draft.code,
          name: draft.name,
          goal: draft.goal || null,
          worst: draft.worst || null,
          expectation: draft.expectation || null,
          finalScore: draft.final || null,
        },
        { token: user.token }
      );

      setRows((prev) => [
        ...prev,
        {
          id: created.id,
          code: created.code,
          name: created.name,
          goal: created.goal ?? "",
          worst: created.worst ?? "",
          expectation: created.expectation ?? "",
          final: created.finalScore ?? "",
        },
      ]);
      await refreshSummary();
    },
    [refreshSummary]
  );

  const updateRowLocal = useCallback((index: number, updates: Partial<CourseRow>) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  }, []);

  const updateRow = useCallback(
    async (row: CourseRow) => {
      if (!row.id) {
        return;
      }
      const user = getStoredAuthUser();
      if (!user?.token) {
        return;
      }

      await putJson(
        `/gpa/${row.id}`,
        {
          code: row.code,
          name: row.name,
          goal: row.goal || null,
          worst: row.worst || null,
          expectation: row.expectation || null,
          finalScore: row.final || null,
        },
        { token: user.token }
      );
      await refreshSummary();
    },
    [refreshSummary]
  );

  const removeRow = useCallback(
    async (index: number) => {
      const row = rows[index];
      if (!row?.id) {
        return;
      }

      const user = getStoredAuthUser();
      if (!user?.token) {
        throw new Error("Нэвтэрч орно уу.");
      }

      await deleteJson(`/gpa/${row.id}`, { token: user.token });
      setRows((prev) => prev.filter((_, rowIndex) => rowIndex !== index));
      await refreshSummary();
    },
    [rows, refreshSummary]
  );

  const addSemesterRow = useCallback(
    async (draft: Omit<SemesterRow, "id">) => {
      const user = getStoredAuthUser();
      if (!user?.token) {
        throw new Error("Нэвтэрч орно уу.");
      }

      const created = await postJson<{
        id: number;
        yearStart?: number | null;
        yearEnd?: number | null;
        season?: string | null;
        classIndex?: string | null;
        className?: string | null;
        finalGpa?: number | null;
      }>(
        "/gpa/semesters",
        {
          yearStart: Number.parseInt(draft.yearStart, 10),
          yearEnd: Number.parseInt(draft.yearEnd, 10),
          season: draft.season,
          classIndex: draft.classIndex,
          className: draft.className,
          finalGpa:
            draft.finalGpa.trim() === ""
              ? null
              : Number.parseFloat(draft.finalGpa),
        },
        { token: user.token }
      );

      setSemesterRows((prev) => [
        ...prev,
        {
          id: created.id,
          yearStart: created.yearStart != null ? created.yearStart.toString() : "",
          yearEnd: created.yearEnd != null ? created.yearEnd.toString() : "",
          season: created.season ?? "",
          classIndex: created.classIndex ?? "",
          className: created.className ?? "",
          finalGpa: created.finalGpa != null ? created.finalGpa.toString() : "",
        },
      ]);
      await refreshSummary();
    },
    [refreshSummary]
  );

  const removeSemesterRow = useCallback(
    async (index: number) => {
      const row = semesterRows[index];
      if (!row?.id) {
        return;
      }

      const user = getStoredAuthUser();
      if (!user?.token) {
        throw new Error("Нэвтэрч орно уу.");
      }

      await deleteJson(`/gpa/semesters/${row.id}`, { token: user.token });
      setSemesterRows((prev) =>
        prev.filter((_, rowIndex) => rowIndex !== index)
      );
      await refreshSummary();
    },
    [semesterRows, refreshSummary]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    rows,
    semesterRows,
    summaryGpa,
    error,
    loading,
    addRow,
    updateRow,
    updateRowLocal,
    removeRow,
    addSemesterRow,
    removeSemesterRow,
    refreshSummary,
  };
}
