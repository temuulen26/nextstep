import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
      <div className="container flex items-center justify-between h-16">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/hero-illustration.png" alt="Next Step" width={36} height={36} />
          <span className="font-bold text-lg text-orange-600">
            NEXT STEP
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/universities">Их сургууль</Link>
          <Link href="/mentors">Ментор</Link>
          <Link href="/calculator">Голч</Link>
          <Link href="/news">Мэдээ</Link>
        </nav>

        {/* CTA */}
        <Link
          href="/auth/login"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Нэвтрэх
        </Link>
      </div>
    </header>
  );
}
