"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getRoleHome, getStoredAuthUser, subscribeToAuthChanges, type Role } from "@/lib/auth";

type RoleGuardProps = {
  allowed: Role[];
  children: React.ReactNode;
};

function getStoredRole() {
  return getStoredAuthUser()?.role ?? null;
}

export default function RoleGuard({ allowed, children }: RoleGuardProps) {
  const role = useSyncExternalStore(subscribeToAuthChanges, getStoredRole, () => undefined);

  if (role === undefined) {
    return <div className="container py-20 text-center" />;
  }

  if (role && allowed.includes(role)) {
    return <>{children}</>;
  }

  const homePath = role ? getRoleHome(role) : "/auth/login";
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
