import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import styles from './Features.module.css';

export default function Features() {
    const features = [
        {
            title: "Context-Aware AI",
            description: "Not generic answers. Personalized responses based on your profile, location, and situation.",
            icon: "🎯"
        },
        {
            title: "Scheme Eligibility Engine",
            description: "Automatically checks which government schemes you qualify for based on your civic profile.",
            icon: "✅"
        },
        {
            title: "Authenticity Checker",
            description: "Verify if a website, document, or message is genuinely from the government.",
            icon: "🔍"
        },
        {
            title: "AI Drafting Assistant",
            description: "Generate properly formatted applications, RTI requests, appeals, and complaints.",
            icon: "📝"
        },
        {
            title: "Alerts & Deadlines",
            description: "Never miss a scheme deadline, renewal date, or important civic action window.",
            icon: "⏰"
        },
        {
            title: "Legal Awareness Layer",
            description: "Understand your basic civic and legal rights in simple language. Not legal advice.",
            icon: "⚖️"
        },
        {
            title: "Secure Document Vault",
            description: "Optionally store important documents encrypted. No Aadhaar or sensitive numbers.",
            icon: "🔒"
        },
        {
            title: "Language Support",
            description: "Access information in your state language with accurate translations.",
            icon: "🌐"
        }
    ];

    return (
        <section id="features" className="section section--alt">
            <Container>
                <div className={styles.features}>
                    <div className={styles.features__header}>
                        <h2 className={styles.features__title}>
                            Features Built for Citizens
                        </h2>
                        <p className={styles.features__subtitle}>
                            Every feature designed to bridge the gap between information and action
                        </p>
                    </div>

                    <div className={styles.features__grid}>
                        {features.map((feature, index) => (
                            <Card key={index} variant="bordered" padding="lg">
                                <div className={styles.feature}>
                                    <div className={styles.feature__icon}>
                                        {feature.icon}
                                    </div>
                                    <h3 className={styles.feature__title}>
                                        {feature.title}
                                    </h3>
                                    <p className={styles.feature__description}>
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
