"use client";

type BannerProps = {
  message: string;
  loading: boolean;
  saving: boolean;
  error: string | null;
  isAdmin: boolean;
  draft: string;
  onDraftChange: (value: string) => void;
  onSave: () => void;
};

export function Banner({
  message,
  loading,
  saving,
  error,
  isAdmin,
  draft,
  onDraftChange,
  onSave,
}: BannerProps) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100">
      <p className="font-semibold text-slate-800">Motivation</p>
      <p className="mt-2">{loading ? "Уншиж байна..." : message}</p>
      {isAdmin ? (
        <div className="mt-3 space-y-2">
          <textarea
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white/90 p-3 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            rows={3}
          />
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
          >
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
