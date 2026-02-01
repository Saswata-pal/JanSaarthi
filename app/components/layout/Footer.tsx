import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Features', href: '#features' },
            { label: 'Demo', href: '#demo' },
        ],
        legal: [
            { label: 'Disclaimer', href: '#disclaimer' },
            { label: 'Privacy Policy', href: '#privacy' },
            { label: 'Terms of Service', href: '#terms' },
        ],
        resources: [
            { label: 'Official Sources', href: '#sources' },
            { label: 'About JanSaarthi', href: '#about' },
            { label: 'Trust & Safety', href: '#trust-safety' },
        ],
    };

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer__content}>
                    {/* Brand */}
                    <div className={styles.footer__brand}>
                        <div className={styles.logo}>
                            <Image
                                src="/images/logo.png"
                                alt="JanSaarthi Logo"
                                width={45}
                                height={45}
                                className={styles.logo__image}
                            />
                            <span className={styles.logo__text}>JanSaarthi</span>
                        </div>
                        <p className={styles.footer__description}>
                            Context-aware civic assistant for Indian citizens.
                            Understanding first, action second.
                        </p>
                        <div className={styles.footer__badge}>
                            <span className={styles.badge}>Built for Citizens</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className={styles.footer__links}>
                        <div className={styles.footer__column}>
                            <h3 className={styles.footer__title}>Product</h3>
                            <ul className={styles.footer__list}>
                                {footerLinks.product.map((link) => (
                                    <li key={link.href}>
                                        <a href={link.href} className={styles.footer__link}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.footer__column}>
                            <h3 className={styles.footer__title}>Legal</h3>
                            <ul className={styles.footer__list}>
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <a href={link.href} className={styles.footer__link}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.footer__column}>
                            <h3 className={styles.footer__title}>Resources</h3>
                            <ul className={styles.footer__list}>
                                {footerLinks.resources.map((link) => (
                                    <li key={link.href}>
                                        <a href={link.href} className={styles.footer__link}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.footer__bottom}>
                    <p className={styles.footer__copyright}>
                        © {currentYear} JanSaarthi. A civic-tech initiative for Indian citizens.
                    </p>
                    <p className={styles.footer__disclaimer}>
                        This is an assistance tool. Always verify information with official sources.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
