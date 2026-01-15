"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { clearAuth, getRoleHome, getStoredAuthUser, type Role } from "@/lib/auth";

export default function Header() {
  const [role, setRole] = useState<Role | null>(() => {
    const user = getStoredAuthUser();
    return user?.role ?? null;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const roleLabel = useMemo(() => {
    if (role === "ADMIN") return "Админ";
    if (role === "MENTOR") return "Ментор";
    if (role === "USER") return "Сурагч";
    return null;
  }, [role]);

  const handleLogout = () => {
    clearAuth();
    setRole(null);
    router.replace("/");
  };

  const navItems = [
    { name: "Нүүр хуудас", href: "/" },
    { name: "Их сургууль", href: "/universities" },
    { name: "Менторууд", href: "/mentors" },
    { name: "Судалгаа", href: "/surveys" },
    { name: "Мэдээ Мэдээлэл", href: "/news" },
    { name: "Голч тооцоологч", href: "/calculator" },
    { name: "Бидний тухай", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
      <div className="container flex items-center justify-between h-16 px-4 md:px-0">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/hero-illustration.png" alt="Next Step" width={40} height={40} />
          <span className="font-extrabold text-lg text-[#ff673d]">NEXT STEP</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group"
            >
              <span className="group-hover:text-[#ff673d] transition">{item.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ff673d] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          {role ? (
            <>
              <Link
                href={getRoleHome(role)}
                className="px-5 py-2 rounded-xl bg-[#FF673d] text-white font-medium shadow hover:bg-orange-600 transition"
              >
                {roleLabel ?? "Миний хэсэг"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-[#ff673d] transition"
              >
                Гарах
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-xl bg-[#FF673d] text-white font-medium shadow hover:bg-orange-600 transition"
            >
              Нэвтрэх
            </Link>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block h-[2px] w-full bg-gray-800 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-[2px] w-full bg-gray-800 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-full bg-gray-800 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 border-t border-gray-200 overflow-hidden shadow-md"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-gray-700 font-medium hover:text-[#ff673d] transition"
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-2 border-t border-gray-200 mt-2">
                {role ? (
                  <>
                    <Link
                      href={getRoleHome(role)}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 rounded-xl bg-[#FF673d] text-white font-medium shadow hover:bg-orange-600 transition mb-2"
                    >
                      {roleLabel ?? "Миний хэсэг"}
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="block w-full text-left text-gray-700 font-medium hover:text-[#ff673d] transition"
                    >
                      Гарах
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 rounded-xl bg-[#FF673d] text-white font-medium shadow hover:bg-orange-600 transition"
                  >
                    Нэвтрэх
                  </Link>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
