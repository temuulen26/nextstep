"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../AuthLayout";
import { postJson } from "@/lib/api";
import { getRoleHome, type Role } from "@/lib/auth";

type AuthResponse = {
  token: string;
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await postJson<AuthResponse>("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data));
      router.replace(getRoleHome(data.role));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Нэвтрэх үед алдаа гарлаа";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
        Нэвтрэх
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border w-full p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Нууц үг"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-orange-500 transition"
            aria-label={showPassword ? "Нууц үгийг нуух" : "Нууц үгийг харуулах"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-600 text-center">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-70"
        >
          {isSubmitting ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </button>
      </form>
    </AuthLayout>
  );
}
