import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type CardItem = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const data: CardItem[] = [
  { id: 1, title: "Aurora Dashboard", description: "Modern admin UI with realtime metrics", image: "https://nuhaweb.com/wp-content/uploads/2024/12/landing-page-thumbnail-1.webp" },
  
];

export default function CardSlider() {
  const [index, setIndex] = useState(0);
  const total = data.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  const get = (i: number) => data[(i + total) % total];

  const items = [get(index - 1), get(index), get(index + 1)];

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full py-16 md:py-20"
    >

      <div className="max-w-7xl mx-auto px-3 sm:px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Karya Futuristik Terpilih
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400">
            Koleksi proyek modern & high performance
          </p>
        </motion.div>

        {/* WRAPPER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="
              absolute left-0 sm:left-2 md:left-4 z-30
              p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 shadow-md sm:shadow-lg
              hover:scale-110 transition active:scale-95
            "
          >
            <AiOutlineLeft size={18} className="sm:w-6 sm:h-6" />
          </button>

          {/* TRACK */}
          <div className="
            flex items-center justify-center w-full
            overflow-hidden
            max-w-[calc(100vw-3rem)]
            sm:max-w-[calc(100vw-5rem)]
            md:max-w-[450px]
            lg:max-w-[900px]
            xl:max-w-[1100px]
          ">

            {items.map((card, i) => {
              const isCenter = i === 1;

              return (
                <div
                  key={card.id}
                  className={`
                    flex justify-center px-1.5 sm:px-2 md:px-3 transition-all duration-500
                    w-full
                    ${i !== 1 ? "hidden lg:flex" : "flex"}
                  `}
                >
                  <div
                    className={`
                      bg-white dark:bg-slate-800
                      rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl
                      w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[420px]
                      transition-transform duration-500
                      ${isCenter ? "scale-100 z-20 animate-fadeIn" : "scale-75 opacity-40 lg:scale-90 lg:opacity-70"}
                    `}
                  >

                    {/* IMAGE */}
                    {card.image && (
                      <img
                        src={card.image}
                        className="
                          w-full object-cover
                          h-32 sm:h-36 md:h-44 lg:h-48 xl:h-52
                        "
                      />
                    )}

                    {/* CONTENT */}
                    <div className="p-3 sm:p-4 md:p-5">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-1">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1.5 sm:mt-2 line-clamp-2">
                        {card.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          if (isCenter && card.image) {
                            window.open(card.image, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        disabled={!isCenter}
                        className={
                          `mt-4 sm:mt-5 w-full rounded-lg py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition ` +
                          (isCenter
                            ? 'bg-gradient-to-r from-[#50d9ae] via-[#4393cc] to-[#4263bd] text-white hover:scale-[1.02] active:scale-[0.98]'
                            : 'cursor-not-allowed bg-slate-200 text-slate-400 opacity-70 dark:bg-slate-700 dark:text-slate-500')
                        }
                      >
                        Lihat Detail →
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="
              absolute right-0 sm:right-2 md:right-4 z-30
              p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 shadow-md sm:shadow-lg
              hover:scale-110 transition active:scale-95
            "
          >
            <AiOutlineRight size={18} className="sm:w-6 sm:h-6" />
          </button>

        </motion.div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </motion.section>
  );
}