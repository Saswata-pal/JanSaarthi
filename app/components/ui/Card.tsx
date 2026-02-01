import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'bordered' | 'elevated';
    padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
    children,
    className = '',
    variant = 'default',
    padding = 'md'
}: CardProps) {
    const classes = [
        styles.card,
        styles[`card--${variant}`],
        styles[`card--padding-${padding}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
}
