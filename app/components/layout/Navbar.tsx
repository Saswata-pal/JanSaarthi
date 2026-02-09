"use client";

import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
    type NavItem,
} from "@/app/components/ui/ResizableNavbar";
import { MovingBorderButton } from "@/app/components/ui/MovingBorder";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JanSaarthiNavbar() {
    const router = useRouter();
    const navItems: NavItem[] = [
        {
            name: "How It Works",
            link: "#how-it-works",
        },
        {
            name: "Features",
            link: "#features",
        },
        {
            name: "Trust & Safety",
            link: "#trust-safety",
        },
        {
            name: "Demo",
            link: "#demo",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogin = () => {
        router.push("/auth/signin");
        setIsMobileMenuOpen(false);
    };

    const handleGetStarted = () => {
        router.push("/auth/signup");
        setIsMobileMenuOpen(false);
    };

    return (
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MovingBorderButton
                        borderRadius="1.75rem"
                        onClick={handleLogin}
                    >
                        Login
                    </MovingBorderButton>
                    <MovingBorderButton
                        borderRadius="1.75rem"
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </MovingBorderButton>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                        <a
                            key={`mobile-link-${idx}`}
                            href={item.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}>
                        <MovingBorderButton
                            borderRadius="1.75rem"
                            onClick={handleLogin}
                        >
                            Login
                        </MovingBorderButton>
                        <MovingBorderButton
                            borderRadius="1.75rem"
                            onClick={handleGetStarted}
                        >
                            Get Started
                        </MovingBorderButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
