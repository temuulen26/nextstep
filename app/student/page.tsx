"use client";

import RoleGuard from "@/components/auth/RoleGuard";

export default function StudentHomePage() {
  return (
    <RoleGuard allowed={["USER", "ADMIN"]}>
      <div className="container py-16">
        <h1 className="text-3xl font-bold text-gray-900">Сурагчийн хэсэг</h1>
        <p className="mt-4 text-gray-600">
          Энэ хэсэгт зөвхөн сурагчийн үйлдлүүд харагдана.
        </p>
      </div>
    </RoleGuard>
  );
}
