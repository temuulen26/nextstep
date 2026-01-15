"use client";

import type { SummaryGpa } from "@/lib/hooks/useGpa";

type GPASummaryProps = {
  summaryGpa: SummaryGpa;
  error?: string | null;
};

export function GPASummary({ summaryGpa, error }: GPASummaryProps) {
  return (
    <div className="rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
          GPA
        </p>
        <div className="space-y-2">
          <div className="grid gap-2 text-sm text-slate-600">
            <p>Goal GPA: {summaryGpa.goal}</p>
            <p>Worst GPA: {summaryGpa.worst}</p>
            <p>Expectation GPA: {summaryGpa.expectation}</p>
            <p>Final GPA: {summaryGpa.final}</p>
          </div>
        </div>
        <p className="text-base text-slate-600">current / 4.00</p>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
