"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRoleHome, getStoredAuthUser, type Role } from "@/lib/auth";

type RoleGuardProps = {
  allowed: Role[];
  children: React.ReactNode;
};

export default function RoleGuard({ allowed, children }: RoleGuardProps) {
  const [status, setStatus] = useState<"checking" | "allowed" | "blocked">(
    "checking"
  );
  const [homePath, setHomePath] = useState<string>("/auth/login");

  useEffect(() => {
    const user = getStoredAuthUser();
    if (!user) {
      setHomePath("/auth/login");
      setStatus("blocked");
      return;
    }
    setHomePath(getRoleHome(user.role));
    if (!allowed.includes(user.role)) {
      setStatus("blocked");
      return;
    }
    setStatus("allowed");
  }, [allowed]);

  if (status === "allowed") {
    return <>{children}</>;
  }

  const message =
    status === "checking"
      ? "Уншиж байна..."
      : "Энэ хуудсанд хандах эрхгүй байна.";

  return (
    <div className="container py-20 text-center">
      <p className="text-lg font-semibold text-gray-800">{message}</p>
      {status === "blocked" ? (
        <Link
          href={homePath}
          className="inline-flex mt-6 px-5 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          Буцах
        </Link>
      ) : null}
    </div>
  );
}
