"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

interface Mentor {
  name: string;
  image: string;
  bio: string;
  examPrep: string;
  expectationVsReality: string;
  schoolTests: string;
  activities: string;
  skills: string;
  threeWords: string[];
  posts: { title: string; date: string; content: string }[];
  school: string;
  major: string;
}

export default function MentorDetailClient({ mentor }: { mentor: Mentor }) {
  const [liked, setLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleLike = () => setLiked((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setQuestion("");
    setShowForm(false);

    console.log("Submitted question:", question);
  };

  return (
    <main className="py-20 bg-gradient-to-b from-[#ff673d]/5 to-white min-h-screen">
      <div className="container max-w-5xl mx-auto space-y-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={mentor.image}
              alt={mentor.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-extrabold">{mentor.name}</h1>
        
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={toggleLike}
                className="p-2 rounded-full bg-[#ff673d]/20 hover:bg-[#ff673d]/30"
              >
                <Heart
                  className={`w-6 h-6 ${liked ? "fill-[#ff673d] text-[#ff673d]" : "text-gray-400"}`}
                />
              </motion.button>
            </div>
            <p className="text-gray-700 leading-relaxed">{mentor.school} - {mentor.major}</p>
            <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>

          </div>
        </motion.div>

        {/* Q&A CARDS */}
        <div className="grid gap-6 md:grid-cols-2">
          <Detail title="ЭЕШ-д бэлдэх арга барил">{mentor.examPrep}</Detail>
          <Detail title="Төсөөлөл vs Бодит байдал">{mentor.expectationVsReality}</Detail>
          <Detail title="Сургуулийн сорилын нөлөө">{mentor.schoolTests}</Detail>
          <Detail title="Хичээлээс гадуурх үйл ажиллагаа">{mentor.activities}</Detail>
          <Detail title="Эзэмшиж буй ур чадвар">{mentor.skills}</Detail>
        </div>

        {/* Three Words */}
        <div className="flex gap-3 flex-wrap justify-center">
          {mentor.threeWords.map((w) => (
            <span
              key={w}
              className="px-4 py-1.5 rounded-full bg-[#ff673d]/20 text-[#ff673d] text-sm font-semibold"
            >
              {w}
            </span>
          ))}
        </div>

        {/* POSTS */}
        <div className="space-y-6 mt-8">
          {mentor.posts.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-md border border-gray-200 p-4"
            >
              {/* Profile */}
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-2">{p.date}</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{p.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA & Chat Form */}
        <div className="mt-8">
          {!showForm && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowForm(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff673d] to-[#ff9461] text-white font-semibold shadow-md hover:shadow-xl transition-all"
            >
              Зөвлөгөө авах →
            </motion.button>
          )}

          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="mt-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            >
              <label className="block text-gray-700 font-semibold mb-2">
                Асуултаа бичнэ үү:
              </label>
              <textarea
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff673d]/50 resize-none"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Танд ямар зөвлөгөө хэрэгтэй вэ?"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="mt-4 w-full py-3 rounded-2xl bg-[#ff673d] text-white font-semibold shadow-md hover:shadow-xl transition-all"
              >
                Илгээх
              </motion.button>
            </motion.form>
          )}

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-600 font-semibold"
            >
              Таны асуулт амжилттай илгээгдлээ!
            </motion.p>
          )}
        </div>

      </div>
    </main>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </motion.div>
  );
}
