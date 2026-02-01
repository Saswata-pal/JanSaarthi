import React from 'react';
import Container from '../ui/Container';
import styles from './TrustSafety.module.css';

export default function TrustSafety() {
    const principles = [
        {
            title: "Official Sources Only",
            description: "All information verified from .gov.in and .nic.in domains. No third-party data.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: "No Speculative Answers",
            description: "If we don't know, we say so. No guesses, no hallucinations in legal contexts.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: "Privacy First",
            description: "No Aadhaar storage. No sensitive number collection. Encrypted document vault is opt-in.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 15V17M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: "Drafting Assistance Only",
            description: "We help draft documents. Final review and submission is always your responsibility.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: "Clear Disclaimers",
            description: "This is civic assistance, not legal advice. Always verify with official channels.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: "Transparent Limitations",
            description: "We clearly state what we can and cannot do. No false promises.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    return (
        <section id="trust-safety" className="section">
            <Container>
                <div className={styles.trust}>
                    <div className={styles.trust__header}>
                        <h2 className={styles.trust__title}>
                            Built for Citizens. Designed with Responsibility.
                        </h2>
                        <p className={styles.trust__subtitle}>
                            Trust is earned through transparency, accuracy, and respect for your privacy
                        </p>
                    </div>

                    <div className={styles.trust__grid}>
                        {principles.map((principle, index) => (
                            <div key={index} className={styles.trust__card}>
                                <div className={styles.trust__icon}>
                                    {principle.icon}
                                </div>
                                <h3 className={styles.trust__card_title}>
                                    {principle.title}
                                </h3>
                                <p className={styles.trust__card_description}>
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.trust__badge}>
                        <div className={styles.badge}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="currentColor" />
                            </svg>
                            <div className={styles.badge__text}>
                                <strong>Civic-Tech Standard</strong>
                                <span>Verified sources • Privacy-first • Transparent limitations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
