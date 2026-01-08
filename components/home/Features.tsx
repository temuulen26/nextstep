import Link from "next/link";

const features = [
  {
    title: "Менторын зөвлөгөө",
    desc: "Туршлагатай оюутан, мэргэжилтнүүд",
    href: "/mentors",
  },
  {
    title: "Голч дүн тооцоологч",
    desc: "Элсэх боломжоо бодитоор харах",
    href: "/calculator",
  },
  {
    title: "Судалгаа & үнэлгээ",
    desc: "Өөрийгөө таньж зөв шийдвэр гаргах",
    href: "/surveys",
  },
];

export default function Features() {
  return (
    <section className="section bg-gray-50">
      <div className="container grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition flex flex-col"
          >
            <h3 className="font-bold text-lg mb-3">
              {f.title}
            </h3>

            <p className="text-gray-600 flex-grow">
              {f.desc}
            </p>

            {/* BUTTON */}
            <Link
              href={f.href}
              className="mt-6 inline-flex items-center gap-2 text-orange-500 font-medium hover:underline"
            >
              Дэлгэрэнгүй →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
