'use client';

import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CardContainer, CardBody, CardItem } from '../ui/3DCard';
import { TypewriterEffectSmooth } from '../ui/TypewriterEffect';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { MovingBorderButton } from '../ui/MovingBorder';
import styles from './Hero.module.css';
import cardStyles from '../ui/3DCard/ThreeDCard.module.css';
import typewriterStyles from '../ui/TypewriterEffect/TypewriterEffect.module.css';

import { useRouter } from 'next/navigation';


export default function Hero() {
    const router = useRouter();

    const headlineWords = [
        { text: "From" },
        { text: "Civic" },
        { text: "Confusion" },
        { text: "to" },
        { text: "Civic" },
        { text: "Action.", className: typewriterStyles['typewriter__word--accent'] }
    ];

    const subheadingText = "JanSaarthi is an AI-powered civic assistant that understands your situation, checks what applies to you, and helps you take the right legal and administrative action — step by step.";

    return (
        <section className={styles.hero}>
            <Container>
                <div className={styles.hero__content}>
                    <div className={styles.hero__text}>
                        <h1 className={styles.hero__headline}>
                            <TypewriterEffectSmooth words={headlineWords} />
                        </h1>

                        <p className={styles.hero__subheading}>
                            <TextGenerateEffect words={subheadingText} duration={2000} />
                        </p>

                        <div className={styles.hero__cta}>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => router.push('/auth/signup')}
                            >
                                Check What Applies to Me
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const element = document.getElementById('how-it-works');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                See How It Works
                            </Button>
                        </div>

                        <div className={styles.hero__trust}>
                            <div className={styles.trust__badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 0L10.4 5.6L16 6.4L12 10.8L12.8 16L8 13.6L3.2 16L4 10.8L0 6.4L5.6 5.6L8 0Z" fill="currentColor" />
                                </svg>
                                <span>Official sources only (.gov.in, .nic.in)</span>
                            </div>
                            <div className={styles.trust__badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 1L3 3V7C3 10.5 5.5 13.5 8 14.5C10.5 13.5 13 10.5 13 7V3L8 1Z" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                                <span>Privacy-first, no Aadhaar storage</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.hero__visual}>
                        <div className={styles.dashboard__preview}>
                            <div className={styles.dashboard__header}>
                                <div className={styles.dashboard__tabs}>
                                    <span className={styles.tab}>Eligible Schemes</span>
                                    <span className={styles.tab}>Alerts</span>
                                    <span className={styles.tab}>Actions</span>
                                </div>
                            </div>

                            <div className={styles.dashboard__body}>
                                {/* 3D Card 1 - Eligible Scheme */}
                                <CardContainer className={cardStyles.card__wrapper}>
                                    <CardBody className={`${styles.scheme__card} ${cardStyles.scheme__card__3d} ${cardStyles.card__3d__enhanced}`}>
                                        <CardItem translateZ="20">
                                            <div className={`${styles.scheme__badge} ${cardStyles.scheme__badge} ${cardStyles['scheme__badge--eligible']}`}>
                                                Eligible
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="50">
                                            <h4 className={cardStyles.scheme__title}>PM KISAN Scheme</h4>
                                        </CardItem>

                                        <CardItem translateZ="40">
                                            <p className={cardStyles.scheme__description}>
                                                Direct income support for farmers
                                            </p>
                                        </CardItem>

                                        <CardItem translateZ="30">
                                            <div className={cardStyles.scheme__meta}>
                                                <span className={cardStyles.scheme__meta__text}>₹6,000/year</span>
                                                <span className={cardStyles.scheme__action}>Apply →</span>
                                            </div>
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>

                                {/* 3D Card 2 - Alert */}
                                <CardContainer className={cardStyles.card__wrapper}>
                                    <CardBody className={`${styles.scheme__card} ${cardStyles.scheme__card__3d} ${cardStyles.card__3d__enhanced}`}>
                                        <CardItem translateZ="20">
                                            <div className={`${styles.scheme__badge} ${cardStyles.scheme__badge} ${cardStyles['scheme__badge--alert']}`}>
                                                Alert
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="50">
                                            <h4 className={cardStyles.scheme__title}>Pending Document</h4>
                                        </CardItem>

                                        <CardItem translateZ="40">
                                            <p className={cardStyles.scheme__description}>
                                                Land ownership certificate required
                                            </p>
                                        </CardItem>

                                        <CardItem translateZ="30">
                                            <div className={cardStyles.scheme__meta}>
                                                <span className={cardStyles.scheme__meta__text}>Due in 5 days</span>
                                                <span className={cardStyles.scheme__action}>Check →</span>
                                            </div>
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>

                                {/* 3D Card 3 - Draft Ready */}
                                <CardContainer className={cardStyles.card__wrapper}>
                                    <CardBody className={`${styles.scheme__card} ${cardStyles.scheme__card__3d} ${cardStyles.card__3d__enhanced}`}>
                                        <CardItem translateZ="20">
                                            <div className={`${styles.scheme__badge} ${cardStyles.scheme__badge} ${cardStyles['scheme__badge--draft']}`}>
                                                Draft Ready
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="50">
                                            <h4 className={cardStyles.scheme__title}>Application Preview</h4>
                                        </CardItem>

                                        <CardItem translateZ="40">
                                            <p className={cardStyles.scheme__description}>
                                                Auto-filled form ready for review
                                            </p>
                                        </CardItem>

                                        <CardItem translateZ="30">
                                            <div className={cardStyles.scheme__meta}>
                                                <span className={cardStyles.scheme__meta__text}>RTI Format</span>
                                                <span className={cardStyles.scheme__action}>Review →</span>
                                            </div>
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>
                            </div>
                        </div>
                    </div>
                </div >
            </Container >
        </section >
    );
}
