"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20"
    >
      <div className="container flex items-center justify-between h-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/hero-illustration.png"
              alt="Next Step"
              width={42}
              height={42}
              priority
            />
          </motion.div>

          <span className="font-extrabold text-lg tracking-wide text-orange-600 group-hover:text-orange-700 transition">
            NEXT STEP
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {[
            {name: "Нүүр хуудас", href: "/" },
            { name: "Их сургууль", href: "/universities" },
            { name: "Менторууд", href: "/mentors" },
            { name: "Судалгаа", href: "/surveys" },
            { name: "Мэдээ Мэдээлэл", href: "/news" },
            {name: "Бидний тухай", href: "/about" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group"
            >
              <span className="group-hover:text-orange-600 transition">
                {item.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/auth/login"
            className="relative overflow-hidden bg-orange-500 text-white px-5 py-2 rounded-xl font-medium shadow-lg hover:bg-orange-600 transition"
          >
            <span className="relative z-10">Нэвтрэх</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
