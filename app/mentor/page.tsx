"use client";

import RoleGuard from "@/components/auth/RoleGuard";

export default function MentorHomePage() {
  return (
    <RoleGuard allowed={["MENTOR", "ADMIN"]}>
      <div className="container py-16">
        <h1 className="text-3xl font-bold text-gray-900">Менторын хэсэг</h1>
        <p className="mt-4 text-gray-600">
          Энэ хэсэгт зөвхөн менторын үйлдлүүд харагдана.
        </p>
      </div>
    </RoleGuard>
  );
}
