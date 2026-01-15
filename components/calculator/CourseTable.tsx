"use client";

import { useMemo, useCallback } from "react";
import type { CourseRow } from "@/lib/hooks/useGpa";

type CourseTableProps = {
  rows: CourseRow[];
  draft: Omit<CourseRow, "id">;
  onUpdateDraft: (key: keyof Omit<CourseRow, "id">, value: string) => void;
  onAddRow: () => void;
  onUpdateRow: (index: number, key: keyof CourseRow, value: string) => void;
  onSaveRow: (row: CourseRow) => void;
  onRemoveRow: (index: number) => void;
};

export function CourseTable({
  rows,
  draft,
  onUpdateDraft,
  onAddRow,
  onUpdateRow,
  onSaveRow,
  onRemoveRow,
}: CourseTableProps) {
  const scoreFields = useMemo(
    () => ["goal", "worst", "expectation", "final"] as const,
    []
  );

  const handleUpdateRow = useCallback(
    (index: number, key: keyof CourseRow, value: string) => {
      onUpdateRow(index, key, value);
    },
    [onUpdateRow]
  );

  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-xl overflow-x-auto">
      <table className="min-w-[880px] w-full border-collapse text-left">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Index
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Хичээл
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Goal
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Worst
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Expectation
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest">
              Final
            </th>
            <th className="p-4 text-xs font-semibold uppercase tracking-widest text-center">
              Устгах
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-200 bg-white/70">
            <td className="p-4">
              <input
                value={draft.code}
                onChange={(event) =>
                  onUpdateDraft("code", event.target.value)
                }
                placeholder="CODE"
                className="w-24 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </td>
            <td className="p-4">
              <input
                value={draft.name}
                onChange={(event) =>
                  onUpdateDraft("name", event.target.value)
                }
                placeholder="Хичээлийн нэр"
                className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </td>
            {scoreFields.map((field) => (
              <td key={field} className="p-4">
                <input
                  value={draft[field]}
                  onChange={(event) => onUpdateDraft(field, event.target.value)}
                  placeholder="-"
                  className="w-20 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </td>
            ))}
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
              key={`${row.code}-${row.id ?? index}`}
              className="border-b border-slate-200 last:border-none"
            >
              <td className="p-4">
                <input
                  value={row.code}
                  onChange={(event) =>
                    handleUpdateRow(index, "code", event.target.value)
                  }
                  onBlur={() => onSaveRow(rows[index])}
                  className="w-24 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </td>
              <td className="p-4">
                <input
                  value={row.name}
                  onChange={(event) =>
                    handleUpdateRow(index, "name", event.target.value)
                  }
                  onBlur={() => onSaveRow(rows[index])}
                  className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </td>
              {scoreFields.map((field) => (
                <td key={field} className="p-4">
                  <input
                    value={row[field]}
                    onChange={(event) =>
                      handleUpdateRow(index, field, event.target.value)
                    }
                    onBlur={() => onSaveRow(rows[index])}
                    placeholder="-"
                    className="w-20 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </td>
              ))}
              <td className="p-4 text-center">
                <button
                  type="button"
                  onClick={() => onRemoveRow(index)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:border-red-300 hover:text-red-600 transition"
                  aria-label="Remove row"
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
