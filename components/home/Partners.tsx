import Image from "next/image"

const partners = [
  {
    name: "Дэлхийн зөн",
    logo: "/partners/worldvision.png",
    url: "https://www.worldvision.org/",
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
          {partners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transition-transform hover:scale-105"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={60}
                className="object-contain mb-2"
              />
              <span className="text-gray-800 font-medium flex items-center gap-1 transition-colors group-hover:text-blue-500">
                {partner.name}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
