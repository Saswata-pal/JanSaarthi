import React from 'react';
import Container from '../ui/Container';
import styles from './Comparison.module.css';

export default function Comparison() {
    const comparisons = [
        {
            aspect: "Personalization",
            government: "One-size-fits-all information",
            chatbots: "Generic conversational responses",
            jansaarthi: "Context-aware based on your profile"
        },
        {
            aspect: "Eligibility",
            government: "You figure it out yourself",
            chatbots: "Maybe answers eligibility questions",
            jansaarthi: "Automatic eligibility engine"
        },
        {
            aspect: "Action Support",
            government: "Download blank forms",
            chatbots: "Talk about it, no execution",
            jansaarthi: "Auto-filled, submission-ready drafts"
        },
        {
            aspect: "Post-Rejection Help",
            government: "No guidance provided",
            chatbots: "Can't really help with specifics",
            jansaarthi: "Analyze rejection + next steps"
        },
        {
            aspect: "Legal Documents",
            government: "Complex templates",
            chatbots: "Risk of hallucination",
            jansaarthi: "Separation: clarity vs drafting"
        },
        {
            aspect: "Trust Model",
            government: "Official but hard to navigate",
            chatbots: "Conversational but unreliable",
            jansaarthi: "Official sources + AI assistance"
        }
    ];

    return (
        <section className="section section--alt">
            <Container>
                <div className={styles.comparison}>
                    <div className={styles.comparison__header}>
                        <h2 className={styles.comparison__title}>
                            Why JanSaarthi Is Not Another Government Portal
                        </h2>
                        <p className={styles.comparison__subtitle}>
                            We combine official accuracy with intelligent execution
                        </p>
                    </div>

                    <div className={styles.comparison__table}>
                        <div className={styles.table__header}>
                            <div className={styles.header__cell}></div>
                            <div className={styles.header__cell}>Government Sites</div>
                            <div className={styles.header__cell}>Chatbots</div>
                            <div className={`${styles.header__cell} ${styles['header__cell--highlight']}`}>
                                JanSaarthi
                            </div>
                        </div>

                        {comparisons.map((row, index) => (
                            <div key={index} className={styles.table__row}>
                                <div className={styles.row__aspect}>{row.aspect}</div>
                                <div className={styles.row__cell}>{row.government}</div>
                                <div className={styles.row__cell}>{row.chatbots}</div>
                                <div className={`${styles.row__cell} ${styles['row__cell--highlight']}`}>
                                    {row.jansaarthi}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.comparison__highlight}>
                        <h3>The JanSaarthi Difference</h3>
                        <div className={styles.highlight__grid}>
                            <div className={styles.highlight__item}>
                                <strong>Context Injection</strong>
                                <span>Your profile powers every recommendation</span>
                            </div>
                            <div className={styles.highlight__item}>
                                <strong>Action-First Design</strong>
                                <span>From understanding to execution</span>
                            </div>
                            <div className={styles.highlight__item}>
                                <strong>Clarity + Execution Separation</strong>
                                <span>Prevents AI errors in legal documents</span>
                            </div>
                            <div className={styles.highlight__item}>
                                <strong>Post-Rejection Guidance</strong>
                                <span>Help when you need it most</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
