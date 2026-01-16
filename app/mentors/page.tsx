"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { mentors } from "@/data/mentors";

export default function MentorsPage() {
  // School-оор ангилна
  const mentorsBySchool: Record<string, typeof mentors> = {};
  mentors.forEach((m) => {
    if (!mentorsBySchool[m.school]) mentorsBySchool[m.school] = [];
    mentorsBySchool[m.school].push(m);
  });

  return (
    <main>
      {/* HEADER */}
      <section className="py-20 bg-gradient-to-br from-[#ff673d]/10 to-white">
        <div className="container text-center">
          <h1 className="text-5xl font-extrabold">
            <span className="text-[#ff673d]">NEXT STEP</span> хөтөлбөрийн ментор оюутнууд
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Тус хөтөлбөрийн ментор оюутнууд нь өөрсдийн туршлагаасаа хуваалцаж, зөвлөгөө өгдөг.
          </p>
        </div>
      </section>

      {/* MENTORS BY SCHOOL */}
      <section className="py-16 space-y-16">
        <div className="container">
          {Object.entries(mentorsBySchool).map(([school, schoolMentors]) => (
            <div key={school}>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">{school}</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {schoolMentors.map((m, i) => (
                  <motion.div
                    key={m.slug}
                    whileHover={{ scale: 1.04 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image src={m.image} alt={m.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{m.name}</h3>
                        <p className="text-sm text-gray-500">
                          {m.major} · {m.level}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600 text-sm">
                      ЭШ өгсөн хичээл: {m.subjects.join(", ")}
                    </p>
                    <p className="mt-2 text-gray-600 text-sm">
                      Их Сургууль: {m.school}
                    </p>

                    <Link href={`/mentors/${m.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="mt-6 w-full py-3 rounded-xl bg-[#ff673d] text-white font-bold"
                      >
                        Дэлгэрэнгүй →
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
