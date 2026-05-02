import { motion } from 'framer-motion';

type Testimonial = {
    name: string;
    jobTitle: string;
    comment: string;
    avatar: string;
    rating: number;
};

const testimonials: Testimonial[] = [
    {
        name: 'Andi Pratama',
        jobTitle: 'Owner Toko Fashion',
        comment: 'Prosesnya cepat, komunikatif, dan hasil websitenya rapi. Tim SatriaCoding benar-benar memahami kebutuhan bisnis saya.',
        avatar: 'https://i.pravatar.cc/160?img=12',
        rating: 5,
    },
    {
        name: 'Siti Rahma',
        jobTitle: 'Manajer Marketing',
        comment: 'Aplikasi mobile yang dibuat sangat membantu operasional tim kami. Desainnya modern dan mudah digunakan.',
        avatar: 'https://i.pravatar.cc/160?img=32',
        rating: 5,
    },
    {
        name: 'Budi Santoso',
        jobTitle: 'Founder Startup Edukasi',
        comment: 'Pelayanan profesional, responsif, dan hasilnya sesuai ekspektasi. Sangat direkomendasikan untuk bisnis yang ingin berkembang.',
        avatar: 'https://i.pravatar.cc/160?img=56',
        rating: 5,
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    key={index}
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 ${index < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.364 2.443a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.364-2.443a1 1 0 0 0-1.176 0l-3.364 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.07 9.377c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 0 0 .95-.69l1.284-3.95Z" />
                </svg>
            ))}
        </div>
    );
}

export default function TestimonialSection() {
    const testimonialGroups = [testimonials, testimonials];

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            <style>{`
				@keyframes testimonial-marquee {
					0% { transform: translate3d(0, 0, 0); }
					100% { transform: translate3d(-50%, 0, 0); }
				}
			`}</style>

            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-600 uppercase shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        Testimoni Pelanggan
                    </div>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
                        Apa kata pelanggan tentang layanan kami
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg dark:text-slate-300">
                        Kepuasan pelanggan adalah prioritas utama. Berikut beberapa pengalaman mereka setelah bekerja sama dengan SatriaCoding.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mt-10 overflow-hidden py-8 sm:py-10"
                >
                    <div
                        className="flex w-max items-stretch gap-0 motion-reduce:animate-none"
                        style={{ animation: 'testimonial-marquee 26s linear infinite' }}
                    >
                        {testimonialGroups.map((group, groupIndex) => (
                            <div key={`group-${groupIndex}`} className="flex shrink-0 gap-8 pr-8 py-2 sm:py-3">
                                {group.map((item, index) => (
                                    <article
                                        key={`${groupIndex}-${item.name}-${index}`}
                                        className="group relative w-[min(82vw,21rem)] flex-none overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:w-[min(66vw,22rem)] md:w-[min(42vw,23rem)] lg:w-[min(30vw,24rem)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                                    >
                                        <div
                                            className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            aria-hidden="true"
                                        />

                                        <div className="flex h-full flex-col gap-5">
                                            <div className="flex items-center justify-between gap-4">
                                                <StarRating rating={item.rating} />
                                            </div>

                                            <p className="text-sm leading-7 text-slate-600 sm:text-[0.98rem] dark:text-slate-300">“{item.comment}”</p>

                                            <div className="mt-auto flex items-center gap-4 border-t border-slate-200 pt-5 dark:border-white/10">
                                                <img
                                                    src={item.avatar}
                                                    alt={item.name}
                                                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-slate-200 dark:border-slate-900 dark:ring-white/10"
                                                    loading="lazy"
                                                    decoding="async"
                                                />

                                                <div>
                                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.jobTitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
