import LogoLoop from './LogoLoop';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SiFlutter, SiHtml5, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import type { LogoItem } from './LogoLoop';

const techWeb: LogoItem[] = [
    { node: <SiReact />, title: 'React' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
];

const techMobile: LogoItem[] = [
    { node: <SiFlutter />, title: 'Flutter' },
    { node: <SiReact />, title: 'React Native' },
    { node: <SiTypescript />, title: 'TypeScript'},
    { node: <SiTailwindcss />, title: 'Tailwind CSS' },
    { node: <SiNextdotjs />, title: 'Next.js' },
];

function LoopCard({
    label,
    logos,
    direction,
    
}: {
    label: string;
    logos: LogoItem[];
    direction: 'left' | 'right';
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl p-[2px] shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_50px_rgba(2,8,23,0.45)]"
        >
            <div className="tech-border absolute inset-0 rounded-3xl" />

            <div className="relative rounded-[calc(1.5rem-2px)] bg-white px-3 py-2 transition-colors duration-300 dark:bg-[#0f172a] md:px-6 md:py-4 lg:px-10 lg:py-6">
                <div className="mb-5 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4393cc]">{label}</p>
                </div>

                <div className="flex items-center justify-center">
                    {/* Large screens */}
                    <div className="hidden lg:block relative h-[92px] w-full overflow-hidden">
                        <LogoLoop
                            logos={logos}
                            speed={100}
                            direction={direction}
                            logoHeight={48}
                            gap={36}
                            hoverSpeed={0}
                            scaleOnHover
                            ariaLabel={label}
                        />
                    </div>

                    {/* Medium screens */}
                    <div className="hidden md:block lg:hidden relative h-[76px] w-full overflow-hidden">
                        <LogoLoop
                            logos={logos}
                            speed={90}
                            direction="left"
                            logoHeight={40}
                            gap={28}
                            hoverSpeed={0}
                            scaleOnHover
                            ariaLabel={label}
                        />
                    </div>

                    {/* Small screens */}
                    <div className="block md:hidden relative h-[64px] w-full overflow-hidden">
                        <LogoLoop
                            logos={logos}
                            speed={80}
                            direction="left"
                            logoHeight={32}
                            gap={20}
                            hoverSpeed={0}
                            scaleOnHover
                            ariaLabel={label}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function TechnologySection() {
    const { t } = useTranslation();
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full overflow-hidden bg-transparent px-4 py-20 md:px-10 lg:px-16"
        >
            <style>{`
                @keyframes borderShimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .tech-border {
                    background: linear-gradient(
                        90deg,
                        #50d9ae 0%,
                        #4393cc 25%,
                        #4263bd 50%,
                        #4393cc 75%,
                        #50d9ae 100%
                    );
                    background-size: 200% 100%;
                    animation: borderShimmer 4s ease-in-out infinite;
                }
            `}</style>

            <div className="mx-auto max-w-7xl">
                <div className="mb-14 text-center md:mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl dark:text-white">{t('technology.title')}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg dark:text-slate-300">
                        {t('technology.description')}
                    </p>
                </div>

                <div className="space-y-8 md:space-y-10">
                    <LoopCard label={t('technology.webLabel')} logos={techWeb} direction="left" />
                    <LoopCard label={t('technology.mobileLabel')} logos={techMobile} direction="right" />
                </div>
            </div>
        </motion.section>
    );
}
