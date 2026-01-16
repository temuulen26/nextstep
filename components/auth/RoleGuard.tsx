"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getRoleHome, getStoredAuthUser, type Role } from "@/lib/auth";

type RoleGuardProps = {
  allowed: Role[];
  children: React.ReactNode;
};

export default function RoleGuard({ allowed, children }: RoleGuardProps) {
  const { status, homePath } = useMemo(() => {
    const user = getStoredAuthUser();
    if (!user) {
      return { status: "blocked" as const, homePath: "/auth/login" };
    }
    const homePath = getRoleHome(user.role);
    if (!allowed.includes(user.role)) {
      return { status: "blocked" as const, homePath };
    }
    return { status: "allowed" as const, homePath };
  }, [allowed]);

  if (status === "allowed") {
    return <>{children}</>;
  }

  return (
    <div className="container py-20 text-center">
      <p className="text-lg font-semibold text-gray-800">Энэ хуудсанд хандах эрхгүй байна.</p>
      <Link
        href={homePath}
        className="inline-flex mt-6 px-5 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
      >
        Буцах
      </Link>
    </div>
  );
}
