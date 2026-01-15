"use client";

import { useMemo, useCallback } from "react";
import type { SemesterRow } from "@/lib/hooks/useGpa";

type YearRange = {
  value: string;
  label: string;
  start: number;
  end: number;
};

type SemesterTableProps = {
  rows: SemesterRow[];
  draft: Omit<SemesterRow, "id">;
  yearRanges: YearRange[];
  onUpdateDraft: (key: keyof Omit<SemesterRow, "id">, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
};

const seasonLabels: Record<string, string> = {
  FALL: "Намар",
  WINTER: "Өвөл",
  SPRING: "Хавар",
  SUMMER: "Зун",
};

export function SemesterTable({
  rows,
  draft,
  yearRanges,
  onUpdateDraft,
  onAddRow,
  onRemoveRow,
}: SemesterTableProps) {
  const selectedYearRange = useMemo(
    () =>
      draft.yearStart && draft.yearEnd
        ? `${draft.yearStart}-${draft.yearEnd}`
        : "",
    [draft.yearStart, draft.yearEnd]
  );

  const handleYearRangeChange = useCallback(
    (value: string) => {
      const [start, end] = value.split("-");
      onUpdateDraft("yearStart", start ?? "");
      onUpdateDraft("yearEnd", end ?? "");
    },
    [onUpdateDraft]
  );

  const getSeasonLabel = useCallback((season: string) => {
    return seasonLabels[season] || season;
  }, []);

  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-xl overflow-x-auto">
      <div className="px-6 pt-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Өмнөх улирлын GPA
        </h2>
        <p className="text-sm text-slate-500">
          Өмнөх улирлын голч дүнгүүдээ хадгалж, дараа нь устгаж болно.
        </p>
      </div>
      <table className="min-w-[880px] w-full border-collapse text-left">
        <thead className="text-slate-700">
          <tr>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Улирал
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Индекс
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Хичээл
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Голч
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest text-center">
              Устгах
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-200 bg-white/60">
            <td className="p-4">
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedYearRange}
                  onChange={(event) => handleYearRangeChange(event.target.value)}
                  className="min-w-[170px] rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <option value="">Жилийн хүрээ</option>
                  {yearRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <select
                  value={draft.season}
                  onChange={(event) =>
                    onUpdateDraft("season", event.target.value)
                  }
                  className="min-w-[160px] rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <option value="">Улирал сонгох</option>
                  <option value="FALL">Намар</option>
                  <option value="WINTER">Өвөл</option>
                  <option value="SPRING">Хавар</option>
                  <option value="SUMMER">Зун</option>
                </select>
              </div>
            </td>
            <td className="p-4">
              <input
                value={draft.classIndex}
                onChange={(event) =>
                  onUpdateDraft("classIndex", event.target.value)
                }
                placeholder="Index"
                className="w-28 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </td>
            <td className="p-4">
              <input
                value={draft.className}
                onChange={(event) =>
                  onUpdateDraft("className", event.target.value)
                }
                placeholder="Хичээлийн нэр"
                className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </td>
            <td className="p-4">
              <input
                value={draft.finalGpa}
                onChange={(event) =>
                  onUpdateDraft("finalGpa", event.target.value)
                }
                placeholder="-"
                className="w-20 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </td>
            <td className="p-4 text-center">
              <button
                type="button"
                onClick={onAddRow}
                className="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
              >
                Нэмэх
              </button>
            </td>
          </tr>
          {rows.map((row, index) => (
            <tr
              key={`${row.yearStart}-${row.season}-${row.id ?? index}`}
              className="border-b border-slate-200 last:border-none"
            >
              <td className="p-4 font-semibold text-slate-700">
                {row.yearStart && row.yearEnd
                  ? `${row.yearStart}-${row.yearEnd} `
                  : ""}
                {getSeasonLabel(row.season)}
              </td>
              <td className="p-4 text-slate-700">{row.classIndex}</td>
              <td className="p-4 text-slate-700">{row.className}</td>
              <td className="p-4 text-slate-700">{row.finalGpa}</td>
              <td className="p-4 text-center">
                <button
                  type="button"
                  onClick={() => onRemoveRow(index)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:border-red-300 hover:text-red-600 transition"
                  aria-label="Remove semester row"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
