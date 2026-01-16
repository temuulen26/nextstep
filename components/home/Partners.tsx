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
  {
    name: "GreenGold Hotel",
    logo: "/partners/greengold.jpg",
    url: "https://www.facebook.com/GreengoldhotelRestaurant",
  },
]

export default function Partners() {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-8 sm:mb-10">
          Хамтрагч байгууллагууд
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 items-center">
          {partners.map((partner, i) => (
            <a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              {/* Logo */}
              <div className="relative mb-3 sm:mb-4">
                <div className="absolute inset-0 rounded-full blur-xl bg-[#ff673d]/20 scale-90 -z-10" />

                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={90}
                  className="object-contain w-20 sm:w-24 transition-transform group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <span
                className="text-gray-800 font-medium
                text-sm sm:text-base
                text-center
                transition-colors group-hover:text-[#ff673d]"
              >
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
