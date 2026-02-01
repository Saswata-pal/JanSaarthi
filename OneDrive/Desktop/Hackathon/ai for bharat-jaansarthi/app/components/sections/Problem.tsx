import React from 'react';
import Container from '../ui/Container';
import styles from './Problem.module.css';

export default function Problem() {
    const problems = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 16H12.01M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: "Information is scattered",
            description: "Government schemes and services spread across hundreds of websites"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: "Language is complex",
            description: "Legal jargon makes it impossible for most citizens to understand their rights"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12V19C21 19.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: "Citizens don't know what applies to them",
            description: "Eligibility criteria are unclear and context-dependent"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: "No clarity on why they were rejected",
            description: "Rejection letters offer no actionable guidance"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: "They don't know what to do next",
            description: "No step-by-step guidance for appeals, complaints, or RTIs"
        }
    ];

    return (
        <section className="section">
            <Container>
                <div className={styles.problem}>
                    <div className={styles.problem__header}>
                        <h2 className={styles.problem__title}>
                            Information Exists. Action Does Not.
                        </h2>
                        <p className={styles.problem__subtitle}>
                            The gap between knowing about a scheme and successfully accessing it is where most citizens fail.
                        </p>
                    </div>

                    <div className={styles.problem__grid}>
                        {problems.map((problem, index) => (
                            <div key={index} className={styles.problem__card}>
                                <div className={styles.problem__icon}>
                                    {problem.icon}
                                </div>
                                <h3 className={styles.problem__card_title}>
                                    {problem.title}
                                </h3>
                                <p className={styles.problem__card_description}>
                                    {problem.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.problem__conclusion}>
                        <p className={styles.conclusion__text}>
                            The failure is not awareness. The failure is <strong>execution</strong>.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
