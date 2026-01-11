"use client";

import { useState, type FormEvent } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import { API_URL } from "@/lib/api";
import { getStoredAuthUser } from "@/lib/auth";

type UserResponse = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
};

export default function AdminHomePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const user = getStoredAuthUser();
    if (!user?.token) {
      setError("Админ эрхээр дахин нэвтэрч орно уу.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/admin/mentors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ fullName, email, password }),
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

      const data = (await res.json()) as UserResponse;
      setSuccess(`${data.fullName} ментор амжилттай үүсгэлээ.`);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Ментор үүсгэхэд алдаа гарлаа";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RoleGuard allowed={["ADMIN"]}>
      <div className="container py-16 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Админ хэсэг</h1>
          <p className="mt-2 text-gray-600">
            Энэ хэсэгт зөвхөн админ үйлдлүүд харагдана.
          </p>
        </div>

        <section className="max-w-xl rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            Ментор нэмэх
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Менторын хэрэглэгчийг үүсгэхдээ email болон нууц үг оруулна.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Нэр"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
            <input
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Нууц үг"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error ? (
              <p className="text-sm text-red-600 text-center">{error}</p>
            ) : null}
            {success ? (
              <p className="text-sm text-green-600 text-center">{success}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-70"
            >
              {isSubmitting ? "Түр хүлээнэ үү..." : "Ментор нэмэх"}
            </button>
          </form>
        </section>
      </div>
    </RoleGuard>
  );
}
