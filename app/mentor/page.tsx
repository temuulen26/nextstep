"use client";

import Link from "next/link";
import RoleGuard from "@/components/auth/RoleGuard";

export default function MentorHomePage() {
  return (
    <RoleGuard allowed={["MENTOR", "ADMIN"]}>
      <main className="container py-16">
        <h1 className="text-3xl font-bold text-gray-900">Менторын хэсэг</h1>
        <Link href="/mentors" className="mt-4 inline-block font-medium text-orange-700">
          Менторуудын жагсаалт
        </Link>
      </main>
    </RoleGuard>
  );
}
