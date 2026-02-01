import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
    return (
        <section className={styles.cta}>
            <Container>
                <div className={styles.cta__content}>
                    <h2 className={styles.cta__title}>
                        Every Citizen Deserves Clarity, Not Confusion.
                    </h2>
                    <p className={styles.cta__description}>
                        Join thousands of Indians transforming civic confusion into confident action.
                        Set up your civic profile and see what applies to you.
                    </p>

                    <div className={styles.cta__actions}>
                        <Button variant="primary" size="lg">
                            Start with My Civic Profile
                        </Button>
                        <Button variant="secondary" size="lg">
                            Explore Dashboard Demo
                        </Button>
                    </div>

                    <div className={styles.cta__trust}>
                        <div className={styles.trust__item}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Free to use</span>
                        </div>
                        <div className={styles.trust__item}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Official sources verified</span>
                        </div>
                        <div className={styles.trust__item}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Privacy protected</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
