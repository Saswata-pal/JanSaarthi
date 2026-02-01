import React from 'react';
import Container from '../ui/Container';
import styles from './detailes.module.css';

export default function Philosophy() {
    return (
        <section className="section section--alt">
            <Container>
                <div className={styles.philosophy}>
                    <div className={styles.philosophy__header}>
                        <h2 className={styles.philosophy__title}>
                            Understanding and Action Must Never Be Mixed.
                        </h2>
                        <p className={styles.philosophy__subtitle}>
                            This strict separation is what makes JanSaarthi trustworthy and accurate.
                        </p>
                    </div>

                    <div className={styles.philosophy__blocks}>
                        <div className={styles.philosophy__block}>
                            <div className={styles.block__number}>1</div>
                            <div className={styles.block__content}>
                                <h3 className={styles.block__title}>Ask & Understand</h3>
                                <p className={styles.block__description}>
                                    Clarity, eligibility checks, legal explanation, rejection analysis.
                                    AI helps you understand your situation and rights.
                                </p>
                                <ul className={styles.block__list}>
                                    <li>Check eligibility for schemes</li>
                                    <li>Understand why you were rejected</li>
                                    <li>Know your basic rights</li>
                                    <li>Get context-aware explanations</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.philosophy__arrow}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className={styles.philosophy__block}>
                            <div className={styles.block__number}>2</div>
                            <div className={styles.block__content}>
                                <h3 className={styles.block__title}>Action Composer</h3>
                                <p className={styles.block__description}>
                                    Formal drafting, submission-ready output, structured formats.
                                    AI helps you execute correct legal and administrative actions.
                                </p>
                                <ul className={styles.block__list}>
                                    <li>Auto-filled applications</li>
                                    <li>RTI requests in proper format</li>
                                    <li>Appeal letters with legal grounding</li>
                                    <li>Complaint drafts ready to submit</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.philosophy__why}>
                        <h3 className={styles.why__title}>Why This Matters</h3>
                        <div className={styles.why__grid}>
                            <div className={styles.why__item}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Prevents AI hallucination in legal documents</span>
                            </div>
                            <div className={styles.why__item}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Ensures formal correctness in applications</span>
                            </div>
                            <div className={styles.why__item}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <span>Builds trust through transparency</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
