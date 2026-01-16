"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { getStoredAuthUser } from "@/lib/auth";

type CourseRow = {
  id?: number;
  code: string;
  name: string;
  goal: string;
  worst: string;
  expectation: string;
  final: string;
};

export default function CalculatorPage() {
  const [rows, setRows] = useState<CourseRow[]>([]);
  const [draft, setDraft] = useState<CourseRow>({
    code: "",
    name: "",
    goal: "",
    worst: "",
    expectation: "",
    final: "",
  });
  const [currentGpaInput, setCurrentGpaInput] = useState("");
  const [summaryGpa, setSummaryGpa] = useState({
    goal: "0.00",
    worst: "0.00",
    expectation: "0.00",
    final: "0.00",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = getStoredAuthUser();
    if (!user?.token) {
      return;
    }
    Promise.all([
      fetch(`${API_URL}/gpa`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      fetch(`${API_URL}/gpa/summary`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
    ])
      .then(async ([rowsRes, summaryRes]) => {
        if (!rowsRes.ok) {
          throw new Error(rowsRes.statusText || "Request failed");
        }
        if (!summaryRes.ok) {
          throw new Error(summaryRes.statusText || "Request failed");
        }
        const rowsData = await rowsRes.json();
        const summaryData = await summaryRes.json();
        return { rowsData, summaryData };
      })
      .then(
        ({
          rowsData,
          summaryData,
        }: {
          rowsData: Array<Record<string, string | number | null>>;
          summaryData: {
            rawScores?: string | null;
            goalGpa?: number;
            worstGpa?: number;
            expectationGpa?: number;
            finalGpa?: number;
          };
        }) => {
          const mapped = rowsData.map((row) => ({
            id: Number(row.id),
            code: String(row.code ?? ""),
            name: String(row.name ?? ""),
            goal: row.goal ? String(row.goal) : "",
            worst: row.worst ? String(row.worst) : "",
            expectation: row.expectation ? String(row.expectation) : "",
            final: row.finalScore ? String(row.finalScore) : "",
          }));
          setRows(mapped);
          setCurrentGpaInput(summaryData.rawScores ?? "");
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
        }
      )
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Алдаа гарлаа");
      });
  }, []);

  const updateRow = (
    index: number,
    key: keyof CourseRow,
    value: string
  ) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const updateDraft = (key: keyof CourseRow, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const addRow = async () => {
    if (!draft.code.trim() || !draft.name.trim()) {
      return;
    }
    setError(null);
    const user = getStoredAuthUser();
    if (!user?.token) {
      setError("Нэвтэрч орно уу.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/gpa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          code: draft.code,
          name: draft.name,
          goal: draft.goal || null,
          worst: draft.worst || null,
          expectation: draft.expectation || null,
          finalScore: draft.final || null,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText || "Request failed");
      }
      const created = (await res.json()) as {
        id: number;
        code: string;
        name: string;
        goal?: string | null;
        worst?: string | null;
        expectation?: string | null;
        finalScore?: string | null;
      };
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
      setDraft({
        code: "",
        name: "",
        goal: "",
        worst: "",
        expectation: "",
        final: "",
      });
      await refreshSummary();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    }
  };

  const refreshSummary = async () => {
    const user = getStoredAuthUser();
    if (!user?.token) {
      return;
    }
    try {
      const res = await fetch(`${API_URL}/gpa/summary`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText || "Request failed");
      }
      const data = (await res.json()) as {
        goalGpa?: number;
        worstGpa?: number;
        expectationGpa?: number;
        finalGpa?: number;
      };
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
  };

  const saveRow = async (row: CourseRow) => {
    if (!row.id) {
      return;
    }
    const user = getStoredAuthUser();
    if (!user?.token) {
      return;
    }
    await fetch(`${API_URL}/gpa/${row.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        code: row.code,
        name: row.name,
        goal: row.goal || null,
        worst: row.worst || null,
        expectation: row.expectation || null,
        finalScore: row.final || null,
      }),
    });
    await refreshSummary();
  };

  const removeRow = async (index: number) => {
    const row = rows[index];
    if (!row) {
      return;
    }
    setError(null);
    const user = getStoredAuthUser();
    if (!user?.token) {
      setError("Нэвтэрч орно уу.");
      return;
    }
    if (row.id) {
      try {
        const res = await fetch(`${API_URL}/gpa/${row.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) {
          throw new Error(res.statusText || "Request failed");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Алдаа гарлаа");
        return;
      }
    }
    setRows((prev) => prev.filter((_, rowIndex) => rowIndex !== index));
    await refreshSummary();
  };

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
            Голч дүнгийн тооцоологч нь таны хичээлүүдийн дүнг тооцоолж, зорилтот GPA-г харьцуулах боломжийг олгоно.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-xl overflow-x-auto">
            <table className="min-w-[880px] w-full border-collapse text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase tracking-widest">
                    Код
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-widest">
                    Хичээл
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-widest">
                    Зорилго
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-widest">
                    Хамгийн муу
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-widest">
                    Таамаг
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-widest">
                    Эцсийн
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
                        updateDraft("code", event.target.value)
                      }
                      placeholder="CODE"
                      className="w-24 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      value={draft.name}
                      onChange={(event) =>
                        updateDraft("name", event.target.value)
                      }
                      placeholder="Хичээлийн нэр"
                      className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                  </td>
                  {(["goal", "worst", "expectation", "final"] as const).map(
                    (field) => (
                      <td key={field} className="p-4">
                        <input
                          value={draft[field]}
                          onChange={(event) =>
                            updateDraft(field, event.target.value)
                          }
                          placeholder="-"
                          className="w-20 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </td>
                    )
                  )}
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={addRow}
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
                          updateRow(index, "code", event.target.value)
                        }
                        onBlur={() => saveRow(rows[index])}
                        className="w-24 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        value={row.name}
                        onChange={(event) =>
                          updateRow(index, "name", event.target.value)
                        }
                        onBlur={() => saveRow(rows[index])}
                        className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                      />
                    </td>
                    {(["goal", "worst", "expectation", "final"] as const).map(
                      (field) => (
                        <td key={field} className="p-4">
                          <input
                            value={row[field]}
                            onChange={(event) =>
                              updateRow(index, field, event.target.value)
                            }
                            onBlur={() => saveRow(rows[index])}
                            placeholder="-"
                            className="w-20 rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          />
                        </td>
                      )
                    )}
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
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

          <aside className="rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                GPA
              </p>
              <div className="space-y-2">
                <input
                  value={currentGpaInput}
                  onChange={(event) => setCurrentGpaInput(event.target.value)}
                  onBlur={async () => {
                    setError(null);
                    const user = getStoredAuthUser();
                    if (!user?.token) {
                      setError("Нэвтэрч орно уу.");
                      return;
                    }
                    try {
                      const res = await fetch(`${API_URL}/gpa/summary`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${user.token}`,
                        },
                        body: JSON.stringify({
                          rawScores: currentGpaInput,
                        }),
                      });
                      if (!res.ok) {
                        throw new Error(res.statusText || "Request failed");
                      }
                      const data = (await res.json()) as {
                        rawScores?: string | null;
                        goalGpa?: number;
                        worstGpa?: number;
                        expectationGpa?: number;
                        finalGpa?: number;
                      };
                      setSummaryGpa({
                        goal:
                          typeof data.goalGpa === "number"
                            ? data.goalGpa.toFixed(2)
                            : "0.00",
                        worst:
                          typeof data.worstGpa === "number"
                            ? data.worstGpa.toFixed(2)
                            : "0.00",
                        expectation:
                          typeof data.expectationGpa === "number"
                            ? data.expectationGpa.toFixed(2)
                            : "0.00",
                        final:
                          typeof data.finalGpa === "number"
                            ? data.finalGpa.toFixed(2)
                            : "0.00",
                      });
                      if (typeof data.rawScores === "string") {
                        setCurrentGpaInput(data.rawScores);
                      }
                    } catch (err) {
                      setError(
                        err instanceof Error ? err.message : "Алдаа гарлаа"
                      );
                    }
                  }}
                  placeholder="Одоогийн GPA"
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-2xl font-black text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <div className="grid gap-2 text-sm text-slate-600">
                  <p>Зорилтот GPA: {summaryGpa.goal}</p>
                  <p>Хамгийн муу GPA: {summaryGpa.worst}</p>
                  <p>Таамаг GPA: {summaryGpa.expectation}</p>
                  <p>Эцсийн GPA: {summaryGpa.final}</p>
                </div>
              </div>
              <p className="text-base text-slate-600">Одоогийн GPA / 4.00</p>
            </div>
            {error ? (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            ) : null}

            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl bg-orange-50/70 p-4">
                <p className="font-semibold text-slate-800">Зорилго</p>
                <p className="mt-2">
                  Хамгийн бага болон зорилтот дүнгээ оруулаад, дохио өгөгдлөө
                  бодитоор харьцуул.
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