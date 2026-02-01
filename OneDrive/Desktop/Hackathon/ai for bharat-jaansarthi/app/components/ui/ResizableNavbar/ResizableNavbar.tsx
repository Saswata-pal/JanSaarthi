'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ResizableNavbar.module.css';

// Types
export interface NavItem {
    name: string;
    link: string;
}

interface NavbarProps {
    children: React.ReactNode;
}

interface NavBodyProps {
    children: React.ReactNode;
}

interface NavItemsProps {
    items: NavItem[];
}

interface NavbarButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    onClick?: () => void;
}

interface MobileNavProps {
    children: React.ReactNode;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
}

interface MobileNavToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

interface MobileNavMenuProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// Main Navbar Container
export function Navbar({ children }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles['navbar--scrolled'] : ''}`}>
            <div className={styles.navbar__container}>
                {children}
            </div>
        </nav>
    );
}

// Desktop Navigation Body
export function NavBody({ children }: NavBodyProps) {
    return (
        <div className={styles.navbar__desktop}>
            {children}
        </div>
    );
}

// Logo Component
export function NavbarLogo() {
    return (
        <Link href="/" className={styles.navbar__logo}>
            <div className={styles.logo}>
                <Image
                    src="/images/logo.png"
                    alt="JanSaarthi Logo"
                    width={40}
                    height={40}
                    className={styles.logo__image}
                />
                <span className={styles.logo__text}>JanSaarthi</span>
            </div>
        </Link>
    );
}

// Navigation Items
export function NavItems({ items }: NavItemsProps) {
    return (
        <ul className={styles.navbar__links}>
            {items.map((item, idx) => (
                <li key={`nav-item-${idx}`}>
                    <a href={item.link} className={styles.navbar__link}>
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}

// Navbar Button
export function NavbarButton({
    children,
    variant = 'primary',
    className = '',
    onClick
}: NavbarButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${styles.navbar__button} ${styles[`navbar__button--${variant}`]} ${className}`}
        >
            {children}
        </button>
    );
}

// Mobile Navigation
export function MobileNav({ children }: MobileNavProps) {
    return (
        <div className={styles.navbar__mobile_wrapper}>
            {children}
        </div>
    );
}

// Mobile Nav Header
export function MobileNavHeader({ children }: MobileNavHeaderProps) {
    return (
        <div className={styles.navbar__mobile_header}>
            {children}
        </div>
    );
}

// Mobile Menu Toggle
export function MobileNavToggle({ isOpen, onClick }: MobileNavToggleProps) {
    return (
        <button
            className={`${styles.navbar__toggle} ${isOpen ? styles['navbar__toggle--open'] : ''}`}
            onClick={onClick}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
}

// Mobile Menu
export function MobileNavMenu({ isOpen, onClose, children }: MobileNavMenuProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.navbar__mobile_menu}>
            {children}
        </div>
    );
}
