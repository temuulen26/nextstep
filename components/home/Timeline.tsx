import Image from "next/image"

const steps = [
  {
    title: "Өөрийгөө тань",
    desc: "Сонирхол, чадвараа тодорхойл",
    img: "/steps/step1.png",
  },
  {
    title: "Мэргэжлээ сонго",
    desc: "Ирээдүйн мэргэжлээ ухаалгаар сонго",
    img: "/steps/step2.png",
  },
  {
    title: "Их сургуулиа судал",
    desc: "Монголын их сургуулиудын мэдээлэлтэй танилц",
    img: "/steps/step3.png",
  },
  {
    title: "Ментороос зөвлөгөө ав",
    desc: "Бодит туршлагаас суралц",
    img: "/steps/step4.png",
  },
]

export default function Timeline() {
  return (
    <section className="section container timeline-bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
        Оюутан болох эхний алхам
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-[#FFE1D6] via-[#FFE1D6] to-[#FFB199] rounded-3xl p-8 text-center shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-40 h-40 mx-auto mb-6 relative">
              <Image
                src={step.img}
                alt={step.title}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
