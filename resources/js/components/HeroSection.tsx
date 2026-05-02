import RouteLines from '@/components/RouteLines';
import { motion } from 'framer-motion';
import { Monitor, Palette, Rocket, Smartphone, type LucideIcon } from 'lucide-react';

/* ================= FLOATING CARD ================= */
const FloatingCard = ({
    icon: Icon,
    title,
    position,
    delay = '0s',
    reverse = false,
}: {
    icon: LucideIcon;
    title: string;
    position: string;
    delay?: string;
    reverse?: boolean;
}) => {
    return (
        <div
            className={`absolute ${position} z-20 will-change-transform`}
            style={{
                animation: `${reverse ? 'float-up-down-reverse' : 'float-up-down'} 6s ease-in-out infinite`,
                animationDelay: delay,
            }}
        >
            <div
                className="
                    flex items-center gap-2
                    rounded-xl border border-white/50 bg-white/85
                    px-3 py-2 shadow-xl backdrop-blur-xl
                    transition hover:-translate-y-1 hover:scale-[1.05]

                    sm:scale-100
                    md:scale-125 md:px-6 md:py-3.5 md:gap-3 md:rounded-2xl
                    lg:scale-100

                    dark:border-white/10 dark:bg-slate-950/30
                "
            >
                <div className="
                    flex h-6 w-6 items-center justify-center rounded-lg
                    bg-gradient-to-br from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc]
                    text-white md:h-9 md:w-9
                ">
                    <Icon className="md:h-[18px] md:w-[18px]" />
                </div>

                <span className="
                    whitespace-nowrap text-xs font-semibold text-slate-700
                    md:text-base lg:text-sm dark:text-gray-100
                ">
                    {title}
                </span>
            </div>
        </div>
    );
};

/* ================= HERO ================= */
const HeroSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="
            relative isolate flex min-h-[90vh] items-center overflow-hidden
            bg-white text-slate-900 dark:bg-[#060e1c] dark:text-white
            pt-16 md:pt-20 lg:min-h-[100vh] lg:pt-0
        "
        >

            {/* BACKGROUND */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70">
                <RouteLines />
            </div>

            {/* CONTENT */}
            <div className="
                relative z-10 mx-auto grid w-full max-w-7xl
                items-center gap-10 px-4 py-14

                /* ❗ IMPORTANT FIX */
                grid-cols-1 lg:grid-cols-2
                lg:px-8 lg:py-20
            ">

                {/* ================= RIGHT (IMAGE) ================= */}
                <div className="
                    order-1 flex w-full items-center justify-center
                    lg:order-2
                ">
                    <div className="
                        relative flex aspect-square w-full max-w-[360px]
                        sm:max-w-[420px]
                        md:max-w-[520px]
                        lg:max-w-[560px]
                        items-center justify-center
                    ">
                        <img
                            src="/images/heronobg.png"
                            className="
                                z-10 w-[90%] object-contain
                                md:w-[85%]
                                lg:w-[95%]
                                drop-shadow-[0_20px_60px_rgba(62,166,176,0.18)]
                            "
                        />

                        {/* FLOATING */}
                        <FloatingCard icon={Palette} title="UI/UX Design" position="top-3 left-3 md:top-6 md:left-8" />
                        <FloatingCard icon={Smartphone} title="Mobile App" position="top-3 right-3 md:top-6 md:right-8" delay="0.5s" reverse />
                        <FloatingCard icon={Monitor} title="Website" position="bottom-6 left-4 md:bottom-10 md:left-12" delay="0.3s" reverse />
                        <FloatingCard icon={Rocket} title="Scalable" position="bottom-6 right-4 md:bottom-10 md:right-12" delay="1s" />
                    </div>
                </div>

                {/* ================= LEFT (TEXT) ================= */}
                <div className="
                    order-2 text-center
                    lg:order-1 lg:text-left
                ">

                    <h1 className="
                        text-3xl font-bold leading-tight
                        md:text-5xl lg:text-6xl
                    ">
                        Jasa Pembuatan Website <br />
                        <span className="bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] bg-clip-text text-transparent">
                            dan Solusi Digital
                        </span>{' '}
                        Purwokerto
                    </h1>

                    <p className="
                        mx-auto mt-5 max-w-xl text-sm text-slate-600
                        md:text-base lg:mx-0 dark:text-gray-400
                    ">
                        Solusi Software House & Partner Digital terbaik di Purwokerto.
                        Kami membantu digitalisasi bisnis Anda dengan website, aplikasi mobile, dan sistem informasi modern.
                    </p>

                    {/* BUTTON FIX CENTER + BESAR DI TABLET */}
                    <div className="
                        mt-7 flex flex-col gap-3
                        sm:flex-row sm:justify-center
                        md:mt-10 md:gap-4
                        lg:justify-start
                    ">
                        <button className="
                            rounded-xl bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc]
                            px-8 py-4 text-sm font-semibold text-slate-950
                            transition hover:scale-105 md:text-base dark:text-white
                        ">
                            Konsultasi Gratis
                        </button>

                        <button className="
                            rounded-xl border border-[#3ea6b0]/25
                            px-8 py-4 text-sm font-semibold text-slate-700
                            transition hover:bg-[#3ea6b0]/10 md:text-base
                            dark:text-gray-200
                        ">
                            Lihat Portofolio
                        </button>
                    </div>
                </div>

            </div>

            {/* ANIMATION */}
            <style>{`
                @keyframes float-up-down {
                    0%,100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes float-up-down-reverse {
                    0%,100% { transform: translateY(0px); }
                    50% { transform: translateY(10px); }
                }
            `}</style>
        </motion.section>
    );
};

export default HeroSection;