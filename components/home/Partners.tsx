import Image from "next/image"

const partners = [
  "/partners/worldvision.png",
  "/partners/edu.png",
  "/partners/tetgeleg.png",
  "/partners/khuvsgul.jpg",
]

export default function Partners() {
  return (
    <section className="section bg-gray-50">
      <div className="container text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-10">
          Хамтрагч байгууллагууд
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
          {partners.map((logo, i) => (
            <div key={i} className="flex justify-center">
              <Image
                src={logo}
                alt="Partner logo"
                width={140}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
