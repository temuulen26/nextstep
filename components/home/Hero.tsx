"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-white to-white">
      
      {/* Glow background */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orange-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-200/40 rounded-full blur-3xl" />

      <div className="relative container section grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Таны <span className="text-orange-500">дараагийн алхам</span><br />
            эндээс эхэлнэ
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            <span className="font-semibold text-gray-800">Next Step-Өөрийгөө бүтээх эхний алхам</span>
            <br /><br />
            BE CONFUSED AND ALL! THAT'S AN ACTUAL PRIVILEGE!
          </p>
          <motion.div
            className="mt-10 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/auth/register"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-orange-600 hover:scale-105 transition"
            >
              Бүртгүүлэх
            </Link>

            <Link
              href="/surveys"
              className="border px-8 py-3 rounded-xl font-medium hover:bg-white hover:shadow transition"
            >
              Судалгаа бөглөх
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative mx-auto"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/heropicture.png"
              alt="Hero"
              width={520}
              height={520}
              className="drop-shadow-2xl hover:scale-105 transition"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
