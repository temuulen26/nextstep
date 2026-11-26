"use client";

import Link from "next/link";
import RoleGuard from "@/components/auth/RoleGuard";

export default function StudentHomePage() {
  return (
    <RoleGuard allowed={["USER", "ADMIN"]}>
      <div className="container py-16">
        <h1 className="text-3xl font-bold text-gray-900">Сурагчийн хэсэг</h1>
        <Link href="/calculator" className="mt-4 inline-block font-medium text-orange-700">
          Голч дүн тооцоолох
        </Link>
      </div>
    </RoleGuard>
  );
}
