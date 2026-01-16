import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { universities } from "../../../data/universities";
export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const university = universities.find((u: typeof universities[0]) => u.id === id);
  if (!university) return notFound();

  return (
    <main className="py-20 bg-gradient-to-b from-[#ff673d]/5 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* IMAGE */}
          <div className="relative h-80">
            <Image
              src={university.image}
              alt={university.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <h1 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-extrabold text-white">
              {university.name}
            </h1>
          </div>

          {/* CONTENT */}
          <div className="p-8 space-y-6">

            <p className="text-gray-700">{university.description}</p>

            {/* STATS */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Stat title="Үүсгэн байгуулагдсан он" value={university.stats.founded} />
                <Stat title="Оюутны тоо" value={university.stats.students} />
                <Stat title="Факультетууд" value={university.stats.faculties} />
              </div>

              <div className="bg-[#ff673d]/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-xl mb-3 text-[#ff673d]">
                  Ямар чиглэлээр суралцах боломжтой вэ?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {university.majors.map((m: string) => (
                    <span
                      key={m}
                      className="px-3 py-1 rounded-full bg-white text-sm font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* WHY */}
            <div className="bg-gradient-to-br from-[#ff673d]/15 to-white rounded-3xl p-8">
              <h3 className="text-2xl font-extrabold mb-4 text-[#ff673d]">
                Яагаад {university.name}?
              </h3>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {university.whyChoose.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={university.website}
                target="_blank"
                className="px-6 py-3 rounded-xl bg-[#ff673d] text-white font-bold text-center"
              >
                Бүртгүүлэх
              </Link>

              <Link
                href="/universities"
                className="px-6 py-3 rounded-xl border font-semibold text-center"
              >
                ← Буцах
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

/* 🔹 Reusable Stat Component */
function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}
