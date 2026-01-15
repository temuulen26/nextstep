"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const images = [
  "/picture1.png",
  "/picture2.png",
  "/picture3.png",
  "/picture4.png",
  "/picture5.png",
  "/picture6.png",
  "/picture7.png",
  "/picture8.png",
];

export default function AboutPage() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#ff673d]/1 via-white to-white py-14 mb-10">
        <div className="absolute -top-24 -left-24 w-[380px] h-[380px] bg-[#ff673d]/30 rounded-full blur-3xl" />

        <div className="container grid md:grid-cols-2 gap-10 items-center relative">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Бид <span className="text-[#ff673d]">ирээдүйн</span><br />
              сонголтыг хамтдаа бүтээнэ
            </h1>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-xl">
              <strong className="text-gray-800">Next Step</strong> бол
              Монголын ахлах ангийн сурагчдад
              их сургууль, мэргэжлээ бодит мэдээлэл дээр
              үндэслэн зөв сонгоход туслах
              боловсролын хөтөлбөр юм.
            </p>
          </motion.div>

          {/* IMAGE SLIDER (4:3) */}
          <div className="relative w-full max-w-[520px] mx-auto">

            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white aspect-[6/3.5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[index]}
                    alt="Next Step 2025 Event"
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ARROWS */}
            <button
              onClick={prev}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-xl hover:bg-[#ff673d] hover:text-white transition"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-xl hover:bg-[#ff673d] hover:text-white transition"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            Яагаад <span className="text-[#ff673d]">Next Step</span> вэ?
          </h2>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Сурагчид их сургууль, мэргэжлээ сонгох үед
            бодит туршлага, зөв чиглүүлэг хамгийн чухал.
            <br /><br />
            Тиймээс Next Step хөтөлбөр нь ментор оюутнуудын туршлагаар дамжуулан
            ирээдүйн сонголтыг тань хийхэд тусалдаг.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-[#ff673d]/5">
        <div className="container grid md:grid-cols-3 gap-6 text-center">
          {[
            { value: "2025", label: "Анх зохион байгуулагдсан" },
            { value: "20+", label: "Ментор оюутан" },
            { value: "100+", label: "Хамрагдсан сурагч" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <h3 className="text-4xl font-extrabold text-[#ff673d]">
                {item.value}
              </h3>
              <p className="mt-2 text-gray-600 font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
<section className="py-14 bg-gray-50">
  <div className="container max-w-3xl text-center">
    <h2 className="text-4xl md:text-5xl font-bold">
      Холбоо <span className="text-[#ff673d]">барих</span>
    </h2>

    <p className="mt-4 text-gray-600 text-lg md:text-xl">
      Бидэнтэй холбогдож илүү их мэдээлэл аваарай
    </p>

    <div className="mt-10 grid md:grid-cols-4 gap-6">
      {[
        { 
          title: "Имэйл", 
          value: "edcouncil901@gmail.com", 
          icon: <FiMail className="text-2xl" />, 
          link: "https://educouncil901@gmail.com" 
        },
        { 
          title: "Instagram", 
          value: "just_graduated.mn", 
          icon: <FaInstagram className="text-2xl" />, 
          link: "https://www.instagram.com/just_graduated.mn/" 
        },
        { 
          title: "Phone", 
          value: "+976 9912 5259", 
          icon: <FiPhoneCall className="text-2xl" />, 
          link: "tel:+97699125259" 
        },
        { 
          title: "Facebook", 
          value: "YOUR Next Step",  
          icon: <FaFacebook className="text-2xl" />, 
          link: "https://www.facebook.com/profile.php?id=61585757210914" 
        },
      ].map((item) => (
        <a
          key={item.title}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition hover:bg-[#ff673d]/10"
        >
          {/* ICON */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ff673d]/10 text-[#ff673d] text-2xl">
            {item.icon}
          </div>

          {/* TEXT */}
          <div className="text-left">
            <p className="font-bold text-lg md:text-xl">{item.title}</p>
            <p className="text-gray-600 text-sm md:text-base">{item.value}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>


    </main>
  );
}
