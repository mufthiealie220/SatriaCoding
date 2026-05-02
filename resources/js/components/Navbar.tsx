import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from '@/components/ui/sheet';

import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { Globe, Menu, Moon, Sun, ChevronDown, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

type Locale = 'id' | 'en' | 'ja' | 'ar';

const languages: { code: Locale; label: string }[] = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JP' },
    { code: 'ar', label: 'AR' },
];

// 🔥 submenu data (tambahan)
const menuData = [
    {
        title: 'Home',
        href: '#',
    },
    {
        title: 'Produk',
        href: '#',
    },
    {
        title: 'About',
        children: [
            { title: 'Company', description: 'Profil, visi, dan nilai utama perusahaan.', href: '#' },
            { title: 'Team', description: 'Kenali tim inti yang membangun layanan kami.', href: '#' },
        ],
    },
    {
        title: 'Services',
        children: [
            { title: 'Web Dev', description: 'Pembuatan website cepat, modern, dan scalable.', href: '#' },
            { title: 'Mobile Dev', description: 'Aplikasi mobile untuk Android dan iOS.', href: '#' },
        ],
    },
    {
        title: 'Contact',
        href: '#',
    },
];

function ThemeToggle() {
    const getInitialTheme = () => {
        if (typeof window === 'undefined') return false;
        try {
            const stored = localStorage.getItem('theme');
            if (stored) return stored === 'dark';
        } catch (e) {
            // ignore
        }

        return document.documentElement.classList.contains('dark');
    };

    const [dark, setDark] = useState<boolean>(() => getInitialTheme());

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch (e) {
            // ignore
        }
    }, [dark]);

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark((s) => !s)}
            className="h-9 w-9 rounded-full border border-[#3ea6b0]/30 bg-white/75 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:shadow-md hover:shadow-[#3ea6b0]/10 sm:h-10 sm:w-10 dark:border-white/10 dark:bg-slate-950/70 dark:hover:bg-slate-900"
        >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
    );
}

function LanguageSelector({ locale, setLocale }: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-9 rounded-full border border-[#3ea6b0]/30 bg-white/75 px-2.5 text-sm shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-[#3ea6b0]/10 sm:h-10 sm:px-3 dark:border-white/10 dark:bg-slate-950/70 dark:hover:bg-slate-900"
                >
                    <Globe className="mr-2 h-4 w-4" />
                    {locale.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="min-w-36 rounded-2xl border border-[#3ea6b0]/30 bg-white/95 p-2 shadow-2xl shadow-[#3ea6b0]/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90"
            >
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLocale(lang.code)}
                        className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#5de3ab]/10 hover:text-slate-950 focus:bg-[#5de3ab]/10 dark:hover:bg-white/10 dark:focus:bg-white/10"
                    >
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function AuthButtons({ auth }: { auth: SharedData['auth'] }) {
    if (auth?.user) {
        return (
            <Link
                href={route('dashboard')}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5de3ab] to-[#3ea6b0] px-3 py-2 text-xs font-medium text-slate-950 shadow-lg shadow-[#3ea6b0]/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#50a3cc]/30 sm:px-4 sm:text-sm dark:text-white dark:shadow-[#50a3cc]/30 dark:hover:shadow-[#4365ba]/40"
            >
                <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                Dashboard
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link
                href={route('login')}
                className="rounded-full px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5de3ab]/10 hover:text-slate-950 sm:px-4 sm:text-sm dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
                Login
            </Link>

            <Link
                href={route('register')}
                className="rounded-full bg-gradient-to-r from-[#5de3ab] to-[#3ea6b0] px-3 py-2 text-xs font-medium text-slate-950 shadow-lg shadow-[#3ea6b0]/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#50a3cc]/30 sm:px-4 sm:text-sm dark:text-white dark:shadow-[#50a3cc]/30 dark:hover:shadow-[#4365ba]/40"
            >
                Register
            </Link>
        </div>
    );
}

// 🔥 DETECT TOUCH DEVICE
const useIsTouch = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    return isTouch;
};

function DesktopMenu() {
    const isTouch = useIsTouch();

    return (
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {menuData.map((item) => {
                // 🔥 kalau ada submenu
                if (item.children) {
                    // 👉 TOUCH → dropdown click
                    if (isTouch) {
                        return (
                            <DropdownMenu key={item.title}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="group relative rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-gradient-to-r after:from-[#5de3ab] after:to-[#3ea6b0] after:transition-transform after:duration-200 after:origin-left group-hover:after:scale-x-100"
                                    >
                                        {item.title}
                                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="start"
                                    sideOffset={18}
                                    className="min-w-[18rem] rounded-3xl border border-[#3ea6b0]/30 bg-white/95 p-3 shadow-2xl shadow-[#3ea6b0]/15 backdrop-blur-xl sm:min-w-[20rem] dark:border-white/10 dark:bg-slate-950/90"
                                >
                                    {item.children.map((sub) => (
                                        <DropdownMenuItem
                                            key={sub.title}
                                            className="cursor-pointer rounded-2xl px-3 py-3 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-[#5de3ab]/15 hover:to-[#3ea6b0]/10 hover:text-slate-950 focus:bg-gradient-to-r focus:from-[#5de3ab]/15 focus:to-[#3ea6b0]/10 dark:hover:bg-white/10 dark:focus:bg-white/10"
                                        >
                                            <Link href={sub.href} className="block w-full">
                                                <span className="block text-[0.95rem] font-semibold text-slate-900 dark:text-white sm:text-base">
                                                    {sub.title}
                                                </span>
                                                <span className="mt-1 block text-[0.78rem] leading-5 text-slate-500 dark:text-slate-400 sm:text-xs">
                                                    {sub.description}
                                                </span>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    }

                    // 👉 DESKTOP → HOVER (FIXED)
                    return (
                        <div key={item.title} className="group relative">
                            {/* BUTTON */}
                            <div className="relative flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
                                {item.title}
                                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                                <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#5de3ab] to-[#3ea6b0] transition-transform duration-200 group-hover:scale-x-100" />
                            </div>

                            {/* DROPDOWN */}
                            <div
                                className="
                                absolute left-1/2 top-full z-50 pt-6
                                -translate-x-1/2 translate-y-3 opacity-0 invisible scale-95
                                transition-all duration-300 ease-out
                                group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-hover:scale-100
                            "
                            >
                                <div
                                    className="
                                    min-w-[320px] overflow-hidden rounded-[1.75rem] border border-[#3ea6b0]/30
                                    bg-white/95 p-3 shadow-2xl shadow-[#3ea6b0]/15 backdrop-blur-xl sm:min-w-[360px]
                                    dark:border-white/10 dark:bg-slate-950/90
                                "
                                >
                                    {item.children.map((sub) => (
                                        <Link
                                            key={sub.title}
                                            href={sub.href}
                                            className="group/block block rounded-2xl px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#5de3ab]/15 hover:to-[#3ea6b0]/10 hover:shadow-md hover:shadow-[#3ea6b0]/10 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white sm:px-5 sm:py-4.5"
                                        >
                                            <span className="block text-[0.95rem] font-semibold text-slate-900 transition-colors duration-200 dark:text-white sm:text-base">
                                                {sub.title}
                                            </span>
                                            <span className="mt-1 block text-[0.78rem] leading-5 text-slate-500 transition-colors duration-200 dark:text-slate-400 sm:text-xs">
                                                {sub.description}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                }

                // 🔥 menu biasa
                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        className="group relative rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                    >
                        {item.title}
                        <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#5de3ab] to-[#3ea6b0] transition-transform duration-200 group-hover:scale-x-100" />
                    </Link>
                );
            })}
        </nav>
    );
}

function MobileMenu({ auth }: { auth: SharedData['auth'] }) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-10 w-10 rounded-full border border-[#3ea6b0]/30 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-[#3ea6b0]/10 dark:border-white/10 dark:bg-slate-950/70 dark:hover:bg-slate-900"
                >
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[92vw] max-w-sm overflow-y-auto border-l border-[#3ea6b0]/20 bg-white/95 px-4 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
                <SheetHeader className="mb-6 space-y-2 text-left">
                    <SheetTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                        Satria Coding
                    </SheetTitle>
                    <SheetDescription className="text-sm text-slate-500 dark:text-slate-400">
                        Navigasi cepat untuk semua halaman.
                    </SheetDescription>
                </SheetHeader>

                {/* Menu  */}
                <div className="flex flex-col gap-2">
                    {menuData.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-1 dark:border-white/10 dark:bg-white/5">
                            <button
                                onClick={() => setOpenMenu(openMenu === item.title ? null : item.title)}
                                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-[#5de3ab]/10 dark:text-slate-200 dark:hover:bg-white/10"
                            >
                                {item.title}
                                {item.children && (
                                    <ChevronDown
                                        className={cn('h-4 w-4 transition-transform duration-300', openMenu === item.title && 'rotate-180')}
                                    />
                                )}
                            </button>

                            {item.children && openMenu === item.title && (
                                <div className="ml-3 mt-2 flex flex-col gap-2 border-l border-[#3ea6b0]/25 pl-3 dark:border-white/10">
                                    {item.children.map((sub) => (
                                        <Link
                                            key={sub.title}
                                            href={sub.href}
                                            className="rounded-2xl px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#5de3ab]/15 hover:to-[#3ea6b0]/10 hover:shadow-sm hover:shadow-[#3ea6b0]/10 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                                        >
                                            <span className="block text-[0.95rem] font-semibold text-slate-800 dark:text-white">
                                                {sub.title}
                                            </span>
                                            <span className="mt-1 block text-[0.78rem] leading-5 text-slate-500 dark:text-slate-400">
                                                {sub.description}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t border-[#3ea6b0]/20 pt-4 dark:border-white/10">
                    <div className="flex flex-col gap-4">
                        <AuthButtons auth={auth} />

                        <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default function Navbar({ auth }: { auth: SharedData['auth'] }) {
    const [scrolled, setScrolled] = useState(false);
    const [locale, setLocale] = useState<Locale>('id');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow,transform,backdrop-filter] duration-300 ease-out',
                scrolled
                    ? 'border-b border-[#3ea6b0]/20 bg-white shadow-md backdrop-blur-md dark:border-white/10 dark:bg-[#060e1c]/90 dark:shadow-black/20'
                    : 'bg-transparent dark:bg-transparent'
            )}
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div
                    className={cn(
                        'flex items-center justify-between gap-3 transition-all duration-300 ease-out',
                        scrolled ? 'min-h-14 py-2 sm:min-h-16 sm:py-2.5' : 'min-h-20 py-3 sm:py-4'
                    )}
                >
                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <div
                            className={cn(
                                'flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#5de3ab] via-[#3ea6b0] to-[#50a3cc] font-bold text-sm text-white shadow-lg shadow-[#3ea6b0]/20 transition-all duration-300 ease-out hover:scale-105 sm:text-base',
                                scrolled ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-9 w-9 sm:h-10 sm:w-10'
                            )}
                        >
                            SC
                        </div>
                        <div
                            className={cn(
                                'hidden flex-col leading-tight transition-all duration-300 ease-out sm:flex',
                                scrolled ? 'scale-[0.96] opacity-95' : 'scale-100 opacity-100'
                            )}
                        >
                            <span className={cn('font-semibold tracking-tight text-slate-900 dark:text-white', scrolled ? 'text-[0.98rem]' : 'text-[1.02rem]')}>
                                Satria Coding
                            </span>
                            <span
                                className={cn(
                                    'mt-1 font-medium tracking-[0.14em] text-slate-500 dark:text-slate-400 transition-all duration-300 ease-out',
                                    scrolled ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'
                                )}
                            >
                                Digital Inovasi Garut
                            </span>
                        </div>
                    </Link>

                    {/* 🔥 UPDATED MENU */}
                    <DesktopMenu />

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden md:flex lg:hidden">
                            <ThemeToggle />
                        </div>

                        <div className="hidden items-center gap-2 lg:flex">
                            <ThemeToggle />
                            <LanguageSelector locale={locale} setLocale={setLocale} />
                            <AuthButtons auth={auth} />
                        </div>

                        <MobileMenu auth={auth} />
                    </div>
                </div>
            </div>
        </header>
    );
}