"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const universities = [
  {
    id: "1",
    name: "Монгол Улсын Их Сургууль",
    image: "/universities/muis.jpg",
    numberofstudents: "19000 бакалаврын оюутан",
    description:
      "Монголын хамгийн ууган их сургууль. Судалгаа, шинжлэх ухаанд суурилсан сургалтаараа тэргүүлэгч.",
    majors: [
      "Шинжлэх ухаан",
      "Нийгэм судлал",
      "Эдийн засаг",
      "Хууль",
      "Инженерчлэл",
      "...",
    ],
  },
  {
    id: "2",
    name: "Шинжлэх Ухаан Технологийн Их Сургууль",
    image: "/universities/shutis.jpg",
    numberofstudents: "20310 оюутан",
    description:
      "Хэрэв та инженерчлэл, технологид дуртай бол ШУТИС таны ирээдүйн гараагаа эхлүүлэх зөв сонголт!",
    majors: [
      "Мэдээллийн технологийн салбар",
      "Инженерийн салбар",
      "Байгаль орчны салбар",
      "Анагаах ухааны салбар",
      "...",
    ],
  },
  {
    id: "3",
    name: "Анагаахын Шинжлэх Ухааны Үндэсний Их Сургууль",
    image: "/universities/ashuuis.jpg",
    numberofstudents: "12000 орчим оюутан",
    description:
      "Хэрэв та эрүүл мэндийн салбарт мэргэшин, хүний амьдралд өөрчлөлт авчрахыг хүсэж байвал АШУҮИС таны хүсэл тэмүүлэлд нийцэх төгс сонголт юм!",
    majors: ["Анагаах ухаан", "Сувилахуй", "Нийгмийн эрүүл мэнд"],
  },
  {
    id: "4",
    name: "Санхүү эдийн засгийн их сургууль",
    image: "/universities/sezis.jpg",
    numberofstudents: "8000 гаруй оюутан",
    description:
      "Хэрэв та дэлхийн зах зээлд өрсөлдөх чадвартай бизнесийн мэргэжилтэн болохыг хүсэж байвал СЭЗИС бол таны ирээдүйн хөтөч байх болно!",
    majors: [
      "Эдийн засаг",
      "Санхүү, банк",
      "Бизнесийн удирдлага",
      "Маркетинг",
      "Менежмент",
      "...",
    ],
    
  },
    {
    id: "5",
    name: "Соёл, урлагийн их сургууль",
    image: "/universities/suis.jpg",
    numberofstudents: "1500 гаруй оюутан",
    description:
      "Хэрэв та өөрийн авьяасыг хөгжүүлж, Монголын соёл урлагийг хөгжүүлэхэд хувь нэмрээ оруулахыг хүсэж байвал Соёл, урлагийн их сургууль таны сонголт байх болно!",
    majors: [
      "Хөгжим судлал",
      "Дуу хөгжмийн багш",
      "Хөгжимчин",
      "Жүжигчин",
      "кино найруулагч",
      "театр судлал",
      "Бүжигчин",
      "бүжгийн багш",
      "Урлагийн менежмент",
      "соёл судлаач",
      "Уран зураг",
      "баримал",
      "дизайн",
      "..."
    ],
  },
    {
    id: "6",
    name: "Урлах эрдмийн дээд сургууль",
    image: "/universities/urlaherdem.png",
    numberofstudents: "3000 орчим оюутан",
    description:
      "Урлаг, дизайны өөрийн хүсэл тэмүүллийг бодит болгохыг хүсвэл Урлах эрдмийн дээд сургууль таны хамгийн зөв сонголт байх болно.",
    majors: [
      "Хувцсны дизайн",
      "Интерьер дизайн",
      "График дизайн",
      "Хувцас үйлдвэрлэлийн технологи",
      "Материал судлал",
      "Загвар зохион бүтээлт",
      "Уран зураг",
      "Гар урлал",
      "..."
    ],
  },
    {
    id: "7",
    name: "German-Mongolian Institute for Technology (GMIT)",
    image: "/universities/gmit.png",
    numberofstudents: "400 орчим оюутан",
    description:
      "Хэрэв та дэлхийн түвшний инженер болж, олон улсад хүлээн зөвшөөрөгдсөн боловсрол эзэмшин, Монголын болон дэлхийн аж үйлдвэрийн салбарт тэргүүлэхийг хүсэж байвал GMIT таны ирээдүйн бат бөх суурь болно!",
    majors: [
      "Механик зохион бүтээх",
      "Тоног төхөөрөмжийн үйлдвэрлэл",
      "Ашигт малтмал боловсруулалт",
      "Сэргээгдэх эрчим хүч",
      "Цахилгаан систем",
      "Робот техник",
      "Автоматжуулалт",
      "Байгаль орчны нөхөн сэргээлт",
      "Үйлдвэрлэлийн менежмент",
      "Логистик",
      "...",
    ],
  },
];

export default function UniversitiesPage() {
  return (
    <main className="py-20 bg-gradient-to-b from-[#ff673d]/5 to-white min-h-screen">
      <div className="container max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Монгол улсын тэргүүлэх их сургуулиуд
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Монголын их сургуулиудын онцлог, мэргэжлийн чиглэл,
            орчны талаарх мэдээллийг эндээс аваарай.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((u, i) => (
            <Link key={u.id} href={`/universities/${u.id}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer h-full"
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold">{u.name}</h2>
                    <p className="text-sm text-gray-500">
                      Оюутан: {u.numberofstudents}
                    </p>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm">
                    {u.description}
                  </p>

                  {/* MAJORS */}
                  <div className="flex flex-wrap gap-2">
                    {u.majors.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-[#ff673d]/20 text-[#ff673d]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* CTA (visual only) */}
                  <div className="pt-4 flex items-center justify-center gap-2 text-[#ff673d] font-semibold">
                    Дэлгэрэнгүй үзэх
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>

    </main>
  );
}
