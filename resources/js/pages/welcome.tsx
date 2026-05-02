import CardSlider from '@/components/CardSlider';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';
import CompanySection from '@/components/CompanySection';
import TeknologiSection from '@/components/TeknologiSection';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <main className="relative bg-white text-slate-900 transition-colors duration-300 dark:bg-[#060e1c] dark:text-white">
                <Navbar auth={auth} />
                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                    <div className="absolute top-[-8%] left-[-6%] h-[20rem] w-[20rem] rounded-full bg-[#50d9ae]/10 blur-2xl sm:h-[24rem] sm:w-[24rem] sm:blur-3xl md:top-[-10%] md:left-[-8%] md:h-[34rem] md:w-[34rem] dark:bg-[#50d9ae]/18" />

                    <div className="absolute top-[12%] right-[-6%] h-[22rem] w-[22rem] rounded-full bg-[#4263bd]/10 blur-2xl sm:h-[28rem] sm:w-[28rem] sm:blur-3xl md:top-[16%] md:right-[-8%] md:h-[36rem] md:w-[36rem] dark:bg-[#4263bd]/18" />

                    <div className="absolute top-[48%] left-[8%] h-[18rem] w-[18rem] rounded-full bg-[#4393cc]/8 blur-2xl sm:h-[22rem] sm:w-[22rem] sm:blur-3xl md:top-[56%] md:left-[18%] md:h-[32rem] md:w-[32rem] dark:bg-[#4393cc]/14" />

                    <div className="absolute right-[4%] bottom-[-10%] h-[16rem] w-[16rem] rounded-full bg-[#50d9ae]/8 blur-2xl sm:h-[20rem] sm:w-[20rem] sm:blur-3xl md:right-[8%] md:bottom-[-14%] md:h-[30rem] md:w-[30rem] dark:bg-[#50d9ae]/12" />
                </div>
                <HeroSection />
                
                <CompanySection />
                <TeknologiSection />
                <CardSlider />
                <PricingSection />
                <TestimonialSection />

                
            </main>
        </>
    );
}
