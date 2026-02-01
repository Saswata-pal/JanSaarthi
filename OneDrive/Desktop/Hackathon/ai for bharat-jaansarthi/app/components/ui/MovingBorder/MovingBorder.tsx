"use client";

import React, { useRef, useState } from "react";
import styles from "./MovingBorder.module.css";

interface MovingBorderButtonProps {
    children: React.ReactNode;
    borderRadius?: string;
    className?: string;
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    onClick?: () => void;
}

export const MovingBorderButton: React.FC<MovingBorderButtonProps> = ({
    children,
    borderRadius = "1.75rem",
    className = "",
    containerClassName = "",
    borderClassName = "",
    duration = 3000,
    onClick,
}) => {
    return (
        <button
            className={`${styles.moving__border__button} ${containerClassName}`}
            style={{
                borderRadius: borderRadius,
            }}
            onClick={onClick}
        >
            <div
                className={`${styles.moving__border} ${borderClassName}`}
                style={{
                    animationDuration: `${duration}ms`,
                }}
            />
            <div
                className={`${styles.button__content} ${className}`}
                style={{
                    borderRadius: `calc(${borderRadius} * 0.96)`,
                }}
            >
                {children}
            </div>
        </button>
    );
};
