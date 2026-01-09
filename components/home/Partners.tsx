import Image from "next/image"

const partners = [
  {
    name: "Дэлхийн зөн",
    logo: "/partners/worldvision.png",
    url: "https://worldvision.mn/en",
  },
  {
    name: "Хөвсгөл аймгийн боловсролын газар",
    logo: "/partners/edu.png",
    url: "http://ed.khs.gov.mn/",
  },
  {
    name: "Tetgeleg",
    logo: "/partners/tetgeleg.png",
    url: "https://www.tetgeleg.mn/",
  },
  {
    name: "Хөвсгөл аймгийн засаг даргын тамгын газар",
    logo: "/partners/khuvsgul.jpg",
    url: "https://khovsgol.gov.mn/",
  },
]

export default function Partners() {
  return (
    <section className="section bg-gray-50">
      <div className="container text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-10">
          Хамтрагч байгууллагууд
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
          {partners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-transform"
            >
              <div
                className="relative mb-4 animate-float
                  group-hover:scale-110 transition-transform duration-300"
              >
                <div className="absolute inset-0 rounded-full blur-2xl bg-[#ff673d] scale-90 -z-10" />

                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={60}
                  className="object-contain"
                />
              </div>

              <span className="text-gray-800 font-medium flex items-center gap-1 transition-colors group-hover:text-[#ff673d]">
                {partner.name}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
