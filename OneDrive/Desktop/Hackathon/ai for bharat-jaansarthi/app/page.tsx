import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Philosophy from './components/sections/detailes';
import HowItWorks from './components/sections/HowItWorks';
import Features from './components/sections/Features';
import TrustSafety from './components/sections/TrustSafety';
import Comparison from './components/sections/Comparison';
import FinalCTA from './components/sections/FinalCTA';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Problem />
                <Philosophy />
                <HowItWorks />
                <Features />
                <TrustSafety />
                <Comparison />
                <FinalCTA />
            </main>
            <Footer />
        </>
    );
}
