import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-white to-white">
      <div className="container section grid md:grid-cols-2 gap-14 items-center">
        
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Таны <span className="text-orange-500">дараагийн алхам</span><br />
            эндээс эхэлнэ
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Мэргэжил сонголт, их сургууль, менторын зөвлөгөө
            бүгд нэг дор.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/auth/register"
              className="bg-orange-500 text-white px-7 py-3 rounded-xl font-medium hover:bg-orange-600 transition"
            >
              Бүртгүүлэх
            </Link>

            <Link
              href="/universities"
              className="border px-7 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Их сургуулиуд
            </Link>
          </div>
        </div>

        <Image
          src="/hero.png"
          alt="Hero"
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>
    </section>
  );
}
