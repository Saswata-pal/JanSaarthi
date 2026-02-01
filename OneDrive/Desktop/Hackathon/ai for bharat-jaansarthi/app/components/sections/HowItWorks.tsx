import React from 'react';
import Container from '../ui/Container';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Civic Profile Setup",
            description: "Tell us about yourself once: location, occupation, income indicators, family details",
            details: [
                "One-time setup",
                "Powers all recommendations",
                "Completely private",
                "Update anytime"
            ]
        },
        {
            number: "2",
            title: "Personalized Dashboard",
            description: "See what applies to you: eligible schemes, active alerts, deadlines, and quick actions",
            details: [
                "Context-aware schemes",
                "Deadline tracking",
                "Authenticity checker",
                "Priority alerts"
            ]
        },
        {
            number: "3",
            title: "Ask & Understand",
            description: "Get clarity on eligibility, legal language, rejection reasons, and your rights",
            details: [
                "Eligibility checks",
                "Rejection analysis",
                "Legal explanations",
                "Always ends with action option"
            ]
        },
        {
            number: "4",
            title: "Action Composer",
            description: "Generate formal applications, RTIs, appeals, and complaints — pre-filled and ready to submit",
            details: [
                "Auto-filled forms",
                "Proper legal format",
                "Editable templates",
                "Download ready"
            ]
        },
        {
            number: "5",
            title: "Follow-up & Guidance",
            description: "Get help after rejection: understand what went wrong, missing documents, correct next steps",
            details: [
                "Post-rejection support",
                "Document checklist",
                "Officer contact info",
                "Appeal guidance"
            ]
        }
    ];

    return (
        <section id="how-it-works" className="section">
            <Container>
                <div className={styles.howItWorks}>
                    <div className={styles.howItWorks__header}>
                        <h2 className={styles.howItWorks__title}>
                            How JanSaarthi Works
                        </h2>
                        <p className={styles.howItWorks__subtitle}>
                            From profile to action in 5 clear steps
                        </p>
                    </div>

                    <div className={styles.howItWorks__steps}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.step}>
                                <div className={styles.step__number}>
                                    <span>{step.number}</span>
                                </div>
                                <div className={styles.step__content}>
                                    <h3 className={styles.step__title}>{step.title}</h3>
                                    <p className={styles.step__description}>{step.description}</p>
                                    <ul className={styles.step__details}>
                                        {step.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={styles.step__connector}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
