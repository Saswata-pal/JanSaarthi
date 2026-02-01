"use client";

import React, { useEffect, useState } from "react";
import styles from "./TextGenerateEffect.module.css";

interface TextGenerateEffectProps {
    words: string;
    className?: string;
    duration?: number;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
    words,
    className = "",
    duration = 1000,
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const wordsArray = words.split(" ");

    useEffect(() => {
        let currentIndex = 0;
        const interval = duration / wordsArray.length;

        const timer = setInterval(() => {
            if (currentIndex < wordsArray.length) {
                setDisplayedText((prev) => {
                    const newText = prev + (prev ? " " : "") + wordsArray[currentIndex];
                    return newText;
                });
                currentIndex++;
            } else {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [words, wordsArray.length, duration]);

    return (
        <span className={`${styles.text__generate} ${className}`}>
            {displayedText.split(" ").map((word, idx) => (
                <span
                    key={`word-${idx}`}
                    className={styles.text__generate__word}
                    style={{
                        animationDelay: `${idx * 0.05}s`,
                    }}
                >
                    {word}{" "}
                </span>
            ))}
        </span>
    );
};
