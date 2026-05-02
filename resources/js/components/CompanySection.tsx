import ImageLoop from '@/components/ImageLoop';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Briefcase, Users, LifeBuoy, MessageCircle } from 'lucide-react';

const stats = [
  { label: 'Project Selesai', value: 120 },
  { label: 'Client Puas', value: 80 },
  { label: 'Tahun Pengalaman', value: 5 },
];

const features = [
  {
    title: 'Inovasi Digital',
    desc: 'Solusi teknologi modern untuk membantu bisnis berkembang cepat.',
    icon: Briefcase,
  },
  {
    title: 'Tim Profesional',
    desc: 'Tim developer berpengalaman, fokus pada kualitas dan delivery.',
    icon: Users,
  },
  {
    title: 'Support 24/7',
    desc: 'Dukungan teknis kapan saja, agar operasional Anda terus berjalan.',
    icon: LifeBuoy,
  },
  {
    title: 'Konsultasi Gratis',
    desc: 'Konsultasi teknologi tanpa biaya untuk memastikan solusi terbaik untuk bisnis Anda.',
    icon: MessageCircle,
  },
];

export default function CompanySection() {
  const portfolioImages = [
   
    { src: 'https://nuhaweb.com/wp-content/uploads/2024/12/landing-page-thumbnail-1.webp', alt: 'Landing page thumbnail preview' },
    { src: 'https://nuhaweb.com/wp-content/uploads/2024/12/landing-page-thumbnail-1.webp', alt: 'Landing page thumbnail preview' },
    { src: 'https://nuhaweb.com/wp-content/uploads/2024/12/landing-page-thumbnail-1.webp', alt: 'Landing page thumbnail preview' },
    { src: 'https://nuhaweb.com/wp-content/uploads/2024/12/landing-page-thumbnail-1.webp', alt: 'Landing page thumbnail preview' },

   
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      className="bg-transparent px-4 pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      <motion.div 
        className="max-w-7xl mx-auto space-y-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >

        {/* TOP */}
        <motion.div 
          className="grid gap-10 items-center lg:grid-cols-2"
          variants={itemVariants}
        >

          {/* LEFT */}
          <div className="max-w-xl mx-auto lg:mx-0 w-full lg:w-auto">
            <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-emerald-100 text-emerald-600 rounded-full">
              Satria Coding
            </span>

            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Solusi Digital untuk Masa Depan
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Kami membantu bisnis berkembang dengan teknologi modern,
              desain elegan, dan performa tinggi.
            </p>

            {/* STATS */}
            <div className="mt-6 grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200/70 bg-white/80 px-1.5 py-1.5 sm:px-2.5 sm:py-2 lg:px-3 lg:py-2.5 text-center sm:text-left shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-emerald-500">
                    <CountUp end={item.value} duration={2} />+
                  </h3>
                  <p className="text-[9px] sm:text-xs lg:text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              className="w-full h-[140px] sm:h-[200px] md:h-[240px] lg:h-[320px] object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -z-10 w-32 h-32 bg-emerald-400 blur-3xl opacity-30 top-10 left-10" />
          </div>
        </motion.div>

        {/* IMAGE LOOP */}
        <motion.div 
          className="rounded-2xl border bg-white dark:bg-slate-800 p-3 sm:p-4 shadow-sm"
          variants={itemVariants}
        >
          <ImageLoop
            images={portfolioImages}
            speed={40}
            direction="left"
            imageHeight={160}
            imageWidth={260}
            gap={16}
          />
        </motion.div>

        {/* FEATURES */}
        <motion.div 
          className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-2xl sm:max-w-none mx-auto lg:mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {features.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                className="rounded-lg border border-slate-200/70 bg-white/85 p-2.5 sm:p-3 lg:p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
                variants={itemVariants}
              >
                <div className="flex items-start gap-2 sm:gap-2.5 lg:gap-3">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg sm:rounded-lg lg:rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-white flex-shrink-0">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-slate-900 dark:text-white">
                      {card.title}
                    </h3>
                    <div className="my-1.5 h-px bg-gradient-to-r from-emerald-400 to-cyan-400/30 dark:from-emerald-500 dark:to-cyan-400/20" />
                    <p className="text-[9px] sm:text-xs lg:text-sm text-slate-600 dark:text-slate-300 leading-tight">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </motion.section>
  );
}