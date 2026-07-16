"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CommandPanel from "@/components/commands/CommandPanel";

interface PhotoItem {
  id: string;
  category: "all" | "kostroma" | "bakery" | "studio";
  src: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: "photo1",
    category: "kostroma",
    src: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800",
    title: "Вечерние улочки",
    location: "Кострома • Центр",
    date: "Июль 2026",
    description: "Тихий вечер среди купеческих торговых рядов. Историческая атмосфера и старинная архитектура старого города.",
  },
  {
    id: "photo2",
    category: "bakery",
    src: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800",
    title: "Хрустящий багет",
    location: "Ремесленная пекарня",
    date: "Июнь 2026",
    description: "Классический ремесленный багет на закваске. Золотистая хрустящая корочка и невероятно воздушный мякиш.",
  },
  {
    id: "photo3",
    category: "studio",
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800",
    title: "Создание битов",
    location: "Домашняя студия",
    date: "Май 2026",
    description: "Процесс сведения нового трека. MIDI-клавиатура, звуковая карта и бесконечные поиски идеального Lo-Fi звучания.",
  },
  {
    id: "photo4",
    category: "bakery",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800",
    title: "Ремесленный подовый хлеб",
    location: "Пекарня • Закваска",
    date: "Июль 2026",
    description: "Свежевыпеченный пшенично-ржаной хлеб. Результат 24 часов холодного брожения и бережной ручной формовки.",
  },
  {
    id: "photo5",
    category: "kostroma",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800",
    title: "Закат на Волге",
    location: "Кострома • Набережная",
    date: "Июнь 2026",
    description: "Летний закат над великой русской рекой. Спокойные воды, отражающие теплые лучи заходящего солнца.",
  },
  {
    id: "photo6",
    category: "studio",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    title: "Программирование",
    location: "Рабочее место",
    date: "Июль 2026",
    description: "Ночной сеанс рефакторинга. Чистый код, уютная подсветка и фоновый плейлист.",
  },
];

const CATEGORIES = [
  { id: "all", label: "Все снимки" },
  { id: "kostroma", label: "Кострома" },
  { id: "bakery", label: "Выпечка" },
  { id: "studio", label: "Творчество" },
] as const;

export default function LastPhotoContent() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "kostroma" | "bakery" | "studio">("all");
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter(
    (photo) => selectedCategory === "all" || photo.category === selectedCategory
  );

  return (
    <CommandPanel>
      <div className="space-y-6">
        {/* Gallery Header */}
        <div className="text-center space-y-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-500/50">
            Раздел V • Визуальная галерея
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-400">
            ФОТОГАЛЕРЕЯ
          </h2>
          <div className="mx-auto h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 font-serif text-[10px] sm:text-[11px] uppercase tracking-wider border rounded-sm transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "border-gold-500/60 bg-gold-500/10 text-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.15)]"
                  : "border-gold-500/10 bg-transparent text-white/40 hover:border-gold-500/30 hover:text-white/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto pt-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActivePhoto(photo)}
                className="group cursor-pointer border border-gold-500/15 bg-[#0a0a0d] p-3 pb-6 rounded-sm hover:border-gold-500/40 hover:shadow-[0_8px_25px_rgba(212,175,55,0.05)] transition-all duration-300"
              >
                {/* Polaroid Frame image container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold-500/10 rounded-sm bg-[#060608]">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover brightness-[0.8] contrast-[1.05] sepia-[0.05] transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.9]"
                    referrerPolicy="no-referrer"
                    sizes="(max-w-sm) 100vw, 300px"
                  />
                  {/* Gold Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold-500/15 via-transparent to-transparent mix-blend-color-burn" />
                </div>

                {/* Short text */}
                <div className="mt-4 text-center">
                  <h3 className="font-serif italic text-gold-400 text-xs tracking-wide">
                    {photo.title}
                  </h3>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-widest text-white/30">
                    {photo.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-10 font-serif italic text-white/40 text-sm">
            Снимки в этой категории временно отсутствуют...
          </div>
        )}

        {/* Elegant Note */}
        <p className="text-center font-serif text-[10px] text-gold-300/30 uppercase tracking-[0.2em] max-w-sm mx-auto">
          ✦ нажмите на карточку для просмотра в деталях ✦
        </p>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-lg w-full border border-gold-500/30 bg-[#0c0c10] p-4 sm:p-5 pb-8 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)]"
              >
                {/* Close Button inside modal */}
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/20 bg-black/60 text-gold-400 hover:border-gold-500/60 hover:text-gold-200 transition-all duration-200"
                  aria-label="Закрыть"
                >
                  <span className="text-sm">✕</span>
                </button>

                {/* Large Polaroid Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold-500/15 rounded-sm bg-[#060608]">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    fill
                    className="object-cover brightness-[0.85] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                    sizes="(max-w-md) 100vw, 600px"
                  />
                </div>

                {/* Full Details block */}
                <div className="mt-5 space-y-2 text-center">
                  <h3 className="font-serif text-lg text-gold-400 tracking-wide font-bold">
                    {activePhoto.title}
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-gold-500/60">
                    {activePhoto.location} • {activePhoto.date}
                  </p>
                  <p className="font-serif text-xs leading-relaxed text-white/80 max-w-sm mx-auto pt-1">
                    {activePhoto.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CommandPanel>
  );
}
