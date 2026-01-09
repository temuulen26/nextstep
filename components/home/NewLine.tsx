"use client"

import Image from "next/image"
import { useState } from "react"

interface Step {
  title: string;
  desc: string;
  detail: string;
  img: string;
}

const steps: Step[] = [
  {
    title: "Next Step-2026",
    desc: "NEXT STEP-2026 бүртгэл хаагдлаа",
    detail:
      "Бүртгүүлсэн оролцогчид 1/16нд 10:30-11:00 хооронд бүртгэлээ хийлгэж тав тухаа олохыг хүсье!Жич: Үүднээс тасалбар зарагдахгүй. Нэмэлт бүртгэл авагдахгүй.1/16нд уулзъя 😊",
    img: "/news/news1.png",
  },
  {
    title: "Мэдээ 2",
    desc: "Мэдээ мэдээлэлэлтэй холбоотой юм",
    detail:
      "Хөдөлмөрийн зах зээлийн эрэлт хэрэгцээ, хувь хүний зорилготой уялдуулан мэргэжлээ сонгох хэрэгтэй.",
    img: "/news2.png",
  },
  {
    title: "Мэдээ 3",
    desc: "Мэдээ мэдээлэлэлтэй холбоотой юм",
    detail:
      "Их, дээд сургуулиудын хөтөлбөр, давуу талыг харьцуулан судлах нь чухал.",
    img: "/news3.png",
  },
  {
    title: "Мэдээ 4",
    desc: "Мэдээ мэдээлэлэлтэй холбоотой юм",
    detail:
      "Дадлага, сайн дурын ажил, туршлага нь таны ур чадварыг бодитоор хөгжүүлнэ.",
    img: "/news4.png",
  },
]

export default function Timeline() {
  const [active, setActive] = useState<Step | null>(null)

  return (
    <section className="section container">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
        Сүүлийн үеийн мэдээ мэдээлэл
      </h2>

      <div className="grid md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="group relative rounded-3xl p-6 bg-gradient-to-br
              from-[#FFE1D6] via-[#FFD0BE] to-[#FFB199]
              shadow-lg hover:shadow-2xl transition-all duration-500
              hover:-translate-y-3"
          >
            {/* Image */}
            <div className="relative w-full h-44 mb-6 overflow-hidden rounded-1xl">
              <Image
                src={step.img}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-700 text-sm mb-4">{step.desc}</p>

            <button
              onClick={() => setActive(step)}
              className="text-[#ff673d] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              Дэлгэрэнгүй →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative animate-scaleIn">
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="relative w-full h-56 mb-6 rounded-xl overflow-hidden">
              <Image
                src={active.img}
                alt={active.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {active.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {active.detail}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
