import Image from "next/image";

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
    title: "Их сургууль судал",
    desc: "Монголын их сургуулиудын мэдээлэл",
    img: "/steps/step3.png",
  },
  {
    title: "Ментороос зөвлөгөө ав",
    desc: "Бодит туршлагаас суралц",
    img: "/steps/step4.png",
  },
];

export default function Timeline() {
  return (
    <section className="section container">
      <h2 className="text-3xl font-bold text-center mb-14">
        NEXT STEP – Таны аялал
      </h2>

      <div className="grid md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl transition"
          >
            <Image
              src={step.img}
              alt={step.title}
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
