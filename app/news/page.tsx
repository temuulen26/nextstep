"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { API_URL } from "@/lib/api";
import { getStoredAuthUser } from "@/lib/auth";

type NewsItem = {
  id: number;
  authorId?: number | null;
  authorName?: string | null;
  title: string;
  excerpt: string;
  content?: string | null;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
};

export default function NewsPage() {
  const [role, setRole] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const apiBase = API_URL.replace(/\/api$/, "");

  const resolveCoverUrl = (url?: string | null) => {
    if (!url) {
      return null;
    }
    return url.startsWith("http") ? url : `${apiBase}${url}`;
  };

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(null);
      return;
    }
    const preview = URL.createObjectURL(coverFile);
    setCoverPreview(preview);
    return () => URL.revokeObjectURL(preview);
  }, [coverFile]);

  useEffect(() => {
    const user = getStoredAuthUser();
    setRole(user?.role ?? null);
    setAuthorName(user?.fullName ?? null);
  }, []);

  const canAddNews = useMemo(
    () => role === "MENTOR" || role === "ADMIN",
    [role]
  );

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetch(`${API_URL}/posts`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText || "Request failed");
        }
        return res.json();
      })
      .then((data: NewsItem[]) => {
        if (isMounted) {
          setNews(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Алдаа гарлаа");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setDeleteError(null);

    if (!title.trim() || !excerpt.trim()) {
      setError("Гарчиг болон товч тайлбар хоёрыг бөглөнө үү.");
      return;
    }

    const user = getStoredAuthUser();
    if (!user?.token) {
      setError("Ментор эрхээр нэвтэрч орно уу.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (excerpt.trim()) {
        formData.append("excerpt", excerpt);
      }
      if (coverFile) {
        formData.append("coverImage", coverFile);
      }

      const res = await fetch(`${API_URL}/mentor/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        let message = res.statusText || "Request failed";
        try {
          const data = await res.json();
          if (typeof data?.message === "string" && data.message.trim()) {
            message = data.message;
          }
        } catch {
          // Ignore parse errors.
        }
        throw new Error(message);
      }

      const created = (await res.json()) as NewsItem;
      setNews((prev) => [created, ...prev]);
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverFile(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Мэдээ үүсгэхэд алдаа гарлаа";
      setError(message);
    }
  };

  const handleDelete = async (postId: number) => {
    setDeleteError(null);
    const user = getStoredAuthUser();
    if (!user?.token) {
      setDeleteError("Нэвтэрч орно уу.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/mentor/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        let message = res.statusText || "Request failed";
        try {
          const data = await res.json();
          if (typeof data?.message === "string" && data.message.trim()) {
            message = data.message;
          }
        } catch {
          // Ignore parse errors.
        }
        throw new Error(message);
      }

      setNews((prev) => prev.filter((item) => item.id !== postId));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Мэдээ устгахад алдаа гарлаа";
      setDeleteError(message);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCoverFile(file);
  };

  return (
    <section className="section container space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Мэдээ, нийтлэл</h1>
        <p className="text-gray-600">Мэдээнүүд</p>
      </div>

      {canAddNews ? (
        <section className="max-w-2xl rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            Мэдээ нэмэх
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Энэ хэсгийг зөвхөн ментор (эсвэл админ) ашиглана.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Гарчиг"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <textarea
              className="border w-full p-3 rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Товч тайлбар"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              required
            />
            <textarea
              className="border w-full p-3 rounded-lg min-h-[140px] focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Дэлгэрэнгүй мэдээлэл (заавал биш)"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
            <div className="space-y-2">
              <div className="relative">
                <input
                  className="border w-full p-3 pr-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Зураг сонгох (заавал биш)"
                  value={coverFile?.name ?? ""}
                  readOnly
                />
                <label className="absolute right-2 top-1/2 -translate-y-1/2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="inline-flex items-center rounded-md bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600 transition cursor-pointer">
                    Зураг сонгох
                  </span>
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Төхөөрөмжөөс зураг сонгоно.
              </p>
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt="Cover preview"
                  width={400}
                  height={128}
                  className="h-32 w-full rounded-lg object-cover"
                />
              ) : null}
            </div>

            {error ? (
              <p className="text-sm text-red-600 text-center">{error}</p>
            ) : null}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Нэмэх
            </button>
          </form>
        </section>
      ) : (
        <p className="text-sm text-gray-500">
          Мэдээ нэмэх эрх зөвхөн ментор болон админд байна.
        </p>
      )}

      <div className="grid gap-4 max-w-3xl">
        {isLoading ? (
          <p className="text-gray-500">Ачаалж байна...</p>
        ) : news.length === 0 ? (
          <p className="text-gray-500">Одоогоор нэмэгдсэн мэдээ алга.</p>
        ) : (
          news.map((item) => {
            const coverUrl = resolveCoverUrl(item.coverImageUrl);
            const canDelete =
              role === "ADMIN" ||
              (role === "MENTOR" &&
                authorName &&
                item.authorName &&
                authorName === item.authorName);
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    {item.authorName ? (
                      <p className="mt-1 text-xs text-gray-500">
                        Нийтэлсэн: {item.authorName}
                      </p>
                    ) : null}
                  </div>
                  {canDelete ? (
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 transition"
                    >
                      Устгах
                    </button>
                  ) : null}
                </div>
                <p className="mt-2 text-gray-600 whitespace-pre-line">
                  {item.excerpt}
                </p>
                {item.content ? (
                  <p className="mt-3 text-gray-600 whitespace-pre-line">
                    {item.content}
                  </p>
                ) : null}
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={item.title}
                    width={400}
                    height={192}
                    className="mt-4 h-48 w-full rounded-xl object-cover"
                  />
                ) : null}
                <p className="mt-4 text-xs text-gray-400">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleString()
                    : "Огноо тодорхойгүй"}
                </p>
              </article>
            );
          })
        )}
        {deleteError ? (
          <p className="text-sm text-red-600 text-center">{deleteError}</p>
        ) : null}
      </div>
    </section>
  );
}
