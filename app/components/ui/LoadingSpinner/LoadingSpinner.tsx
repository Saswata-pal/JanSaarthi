"use client";

import React, { useEffect, useState } from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    isLoading?: boolean;
}

export default function LoadingSpinner({ isLoading = true }: LoadingSpinnerProps) {
    if (!isLoading) return null;

    return (
        <div className={styles.loading__overlay}>
            <div className={styles.loading__container}>
                <div className={styles.spinner__outer}>
                    <div className={styles.spinner__inner}></div>
                </div>
            </div>
        </div>
    );
}

// Loading wrapper component that shows spinner on initial page load
export function PageLoadingWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hide loading after a short delay to ensure content is ready
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <LoadingSpinner isLoading={isLoading} />
            <div className={isLoading ? styles.content__hidden : styles.content__visible}>
                {children}
            </div>
        </>
    );
}
