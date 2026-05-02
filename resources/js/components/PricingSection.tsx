import { Check, ChevronDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

type Plan = {
    name: string;
    price: string;
    description: string;
    highlight?: boolean;
    features: string[];
};

// ====== WEB APP ======
const webCompanyProfilePlans: Plan[] = [
    {
        name: 'Starter',
        price: 'Rp 0',
        description: 'Selamanya Gratis',
        features: ['1 Halaman Profile', 'Basic Info', 'Contact Form', 'Email Support'],
    },
    {
        name: 'Business',
        price: 'Rp 1500000',
        description: 'Per Tahun',
        highlight: true,
        features: ['3-5 Halaman', 'Custom Design', 'SEO Ready', 'Priority Support'],
    },
    {
        name: 'Enterprise',
        price: 'Rp 2500000',
        description: 'Dedicated Team',
        features: ['Unlimited Pages', 'Full Branding', 'Advanced SEO', '24/7 Support'],
    },
];

const webLandingPagePlans: Plan[] = [
    {
        name: 'Starter',
        price: 'Rp 0',
        description: 'Selamanya Gratis',
        features: ['1 Section', 'Basic Layout', 'Mobile Responsive', 'Email Support'],
    },
    {
        name: 'Business',
        price: 'Rp 2000000',
        description: 'Per Tahun',
        highlight: true,
        features: ['Custom Sections', 'Animation Effects', 'Form Integration', 'Analytics'],
    },
    {
        name: 'Enterprise',
        price: 'Rp 3500000',
        description: 'Dedicated Team',
        features: ['Unlimited Sections', 'Advanced Animation', 'CRM Integration', '24/7 Support'],
    },
];

const webEcommercePlans: Plan[] = [
    {
        name: 'Starter',
        price: 'Rp 0',
        description: 'Selamanya Gratis',
        features: ['Up to 10 Products', 'Basic Cart', 'Payment Gateway', 'Email Support'],
    },
    {
        name: 'Business',
        price: 'Rp 3000000',
        description: 'Per Tahun',
        highlight: true,
        features: ['Up to 500 Products', 'Advanced Cart', 'Multiple Payment', 'Inventory System'],
    },
    {
        name: 'Enterprise',
        price: 'Rp 5000000',
        description: 'Dedicated Team',
        features: ['Unlimited Products', 'Full Customization', 'API Integration', '24/7 Support'],
    },
];

// ====== MOBILE APP ======
const mobileEcommercePlans: Plan[] = [
    {
        name: 'Starter',
        price: 'Rp 0',
        description: 'Selamanya Gratis',
        features: ['Basic Store', 'Product Listing', 'Simple Checkout', 'Email Support'],
    },
    {
        name: 'Business',
        price: 'Rp 2500000',
        description: 'Per Tahun',
        highlight: true,
        features: ['Advanced Store', 'Product Variants', 'Push Notifications', 'Analytics'],
    },
    {
        name: 'Enterprise',
        price: 'Rp 4500000',
        description: 'Dedicated Team',
        features: ['Full Commerce Suite', 'AI Recommendations', 'Multi-vendor', '24/7 Support'],
    },
];

const mobileKasirPlans: Plan[] = [
    {
        name: 'Starter',
        price: 'Rp 0',
        description: 'Selamanya Gratis',
        features: ['Basic POS', 'Transaction Log', 'Simple Reports', 'Email Support'],
    },
    {
        name: 'Business',
        price: 'Rp 1800000',
        description: 'Per Tahun',
        highlight: true,
        features: ['Advanced POS', 'Inventory Management', 'Detailed Reports', 'Priority Support'],
    },
    {
        name: 'Enterprise',
        price: 'Rp 3500000',
        description: 'Dedicated Team',
        features: ['Full POS System', 'Multi-outlet', 'Advanced Analytics', '24/7 Support'],
    },
];

const appCategories = {
    web: [
        { id: 'company', label: 'Company Profile' },
        { id: 'landing', label: 'Landing Page' },
        { id: 'ecommerce', label: 'Ecommerce' },
    ],
    mobile: [
        { id: 'ecommerce', label: 'E-commerce' },
        { id: 'kasir', label: 'Kasir' },
    ],
};

const plansByCategory = {
    'web-company': webCompanyProfilePlans,
    'web-landing': webLandingPagePlans,
    'web-ecommerce': webEcommercePlans,
    'mobile-ecommerce': mobileEcommercePlans,
    'mobile-kasir': mobileKasirPlans,
};

export default function PricingSection() {
    const [appType, setAppType] = useState<'web' | 'mobile'>('web');
    const [selectedCategory, setSelectedCategory] = useState<string>(appCategories.web[0]?.id || 'company');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const categories = appType === 'web' ? appCategories.web : appCategories.mobile;
    const categoryKey = `${appType}-${selectedCategory}` as keyof typeof plansByCategory;
    const plans = plansByCategory[categoryKey] || [];

    const scroll = (dir: 'left' | 'right') => {
        if (!sliderRef.current) return;
        const width = sliderRef.current.clientWidth * 0.9;
        sliderRef.current.scrollBy({
            left: dir === 'left' ? -width : width,
            behavior: 'smooth',
        });
    };

    const handleAppTypeChange = (type: 'web' | 'mobile') => {
        const prevType = appType;
        setAppType(type);
        // only reset selectedCategory when switching to a different app type
        if (type !== prevType) {
            setSelectedCategory(appCategories[type][0]?.id || '');
            setIsDropdownOpen(true);
        } else {
            // toggle dropdown when clicking the same app button
            setIsDropdownOpen((prev) => !prev);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-slate-600 uppercase shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        Flexible Pricing
                    </div>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
                        Paket Harga Modern
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg dark:text-slate-300">
                        Pilih paket terbaik untuk pertumbuhan bisnis kamu. Semua paket sudah mobile-first, cepat, dan siap scale.
                    </p>

                    <div className="mt-7 flex justify-center">
                        <div className="relative inline-flex flex-col">
                            {/* TOGGLE BUTTONS */}
                            <div className="inline-flex rounded-full border border-slate-200/80 bg-white/75 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                                <button
                                    onClick={() => handleAppTypeChange('web')}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 ${
                                        appType === 'web'
                                            ? 'animate-pulse-soft bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] text-slate-950 shadow-sm hover:scale-105 dark:text-white'
                                            : 'text-slate-600 hover:scale-105 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                    }`}
                                    aria-expanded={appType === 'web' && isDropdownOpen}
                                >
                                    Web App
                                    <ChevronDown
                                        size={14}
                                        className={`ml-2 inline-block transition-transform duration-300 ${appType === 'web' && isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <button
                                    onClick={() => handleAppTypeChange('mobile')}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 ${
                                        appType === 'mobile'
                                            ? 'animate-pulse-soft bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] text-slate-950 shadow-sm hover:scale-105 dark:text-white'
                                            : 'text-slate-600 hover:scale-105 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                    }`}
                                    aria-expanded={appType === 'mobile' && isDropdownOpen}
                                >
                                    Mobile App
                                    <ChevronDown
                                        size={14}
                                        className={`ml-2 inline-block transition-transform duration-300 ${appType === 'mobile' && isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                            </div>

                            {/* DROPDOWN KATEGORI (tampil saat isDropdownOpen) */}
                            {isDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="animate-in fade-in zoom-in-95 absolute top-full left-1/2 z-50 mt-3 w-max min-w-[220px] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-md duration-200 dark:border-white/10 dark:bg-slate-950/95"
                                >
                                    <div className="py-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => {
                                                    setSelectedCategory(category.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`block w-full px-5 py-3 text-left text-sm font-medium transition-all duration-200 ${
                                                    selectedCategory === category.id
                                                        ? 'bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] text-white'
                                                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                                                }`}
                                            >
                                                {category.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-8"
                >
                    {plans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="relative md:hidden"
                >
                    <div
                        ref={sliderRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pr-1 pb-5 pl-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {plans.map((plan) => (
                            <div key={plan.name} className="min-w-[88%] snap-center">
                                <PricingCard plan={plan} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-slate-900 hover:shadow-lg hover:shadow-[rgba(93,227,171,0.2)] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-white"
                            aria-label="Geser ke kiri"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <button
                            onClick={() => scroll('right')}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-slate-900 hover:shadow-lg hover:shadow-[rgba(93,227,171,0.2)] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-white"
                            aria-label="Geser ke kanan"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

function PricingCard({ plan }: { plan: Plan }) {
    return (
        <>
            <style>{`
        @keyframes pulse-soft {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 4px 12px rgba(93, 227, 171, 0.15);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 4px 20px rgba(93, 227, 171, 0.25);
          }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
            <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
                    plan.highlight
                        ? 'border-transparent bg-gradient-to-br from-[#4263bd] via-[#3ea6b0] to-[#5de3ab] text-white shadow-[0_18px_55px_rgba(62,166,176,0.35)]'
                        : 'border-slate-200 bg-white/80 text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white'
                }`}
            >
                {!plan.highlight && (
                    <div
                        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(93,227,171,0.12),transparent_38%)] opacity-80 dark:bg-[radial-gradient(circle_at_top_right,rgba(80,217,174,0.18),transparent_40%)]"
                        aria-hidden="true"
                    />
                )}

                <div className="mb-5 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl md:text-lg lg:text-2xl">{plan.name}</h3>

                    {plan.highlight && (
                        <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase backdrop-blur md:px-2 md:py-0.5 md:text-[9px] lg:text-[11px]">
                            Most Popular
                        </span>
                    )}
                </div>

                <div className="mb-6 border-b border-slate-200/70 pb-5 dark:border-white/10">
                    <div className="mb-3 flex items-center">
                        <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            plan.highlight
                                ? 'bg-white/15 text-white'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                            <Sparkles className="h-3 w-3" />
                            Dimulai dengan harga
                        </span>
                    </div>

                    <span className="text-2xl leading-none font-bold sm:text-xl md:text-2xl lg:text-3xl">{plan.price}</span>
                    <span className={`mt-4 block text-xs font-medium ${plan.highlight ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
                        {plan.description}
                    </span>
                </div>

                <ul className="mb-8 space-y-3.5">
                    {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm leading-6">
                            <span
                                className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                    plan.highlight
                                        ? 'bg-white/20 text-white'
                                        : 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300'
                                }`}
                            >
                                <Check size={13} />
                            </span>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>

                <button
                    className={`group relative mt-auto overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                        plan.highlight
                            ? 'bg-white text-[#1f2d69] hover:scale-105 hover:bg-slate-100 hover:shadow-lg hover:shadow-white/20 active:scale-95'
                            : 'bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] text-slate-950 hover:scale-105 hover:shadow-lg hover:shadow-[rgba(93,227,171,0.4)] active:scale-95 dark:text-white'
                    }`}
                >
                    <span className="relative z-10">Pilih Paket</span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                </button>
            </div>
        </>
    );
}
