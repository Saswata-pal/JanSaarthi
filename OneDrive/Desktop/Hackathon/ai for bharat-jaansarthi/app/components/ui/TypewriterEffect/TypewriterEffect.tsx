"use client";

import React, { useEffect, useState } from "react";
import styles from "./TypewriterEffect.module.css";

export interface Word {
    text: string;
    className?: string;
}

interface TypewriterEffectProps {
    words: Word[];
    className?: string;
    cursorClassName?: string;
}

export const TypewriterEffectSmooth: React.FC<TypewriterEffectProps> = ({
    words,
    className = "",
    cursorClassName = "",
}) => {
    const [displayedWords, setDisplayedWords] = useState<Word[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isComplete || currentWordIndex >= words.length) return;

        const currentWord = words[currentWordIndex];

        if (currentText.length < currentWord.text.length) {
            // Still typing current word
            const timeout = setTimeout(() => {
                setCurrentText(currentWord.text.slice(0, currentText.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            // Current word complete
            const timeout = setTimeout(() => {
                setDisplayedWords([
                    ...displayedWords,
                    { text: currentText, className: currentWord.className },
                ]);
                setCurrentText("");

                // Check if this was the last word
                if (currentWordIndex === words.length - 1) {
                    setIsComplete(true);
                } else {
                    setCurrentWordIndex(currentWordIndex + 1);
                }
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [currentText, currentWordIndex, words, displayedWords, isComplete]);

    return (
        <div className={`${styles.typewriter} ${className}`}>
            <div className={styles.typewriter__words}>
                {displayedWords.map((word, idx) => (
                    <span
                        key={`word-${idx}`}
                        className={`${styles.typewriter__word} ${word.className || ""}`}
                    >
                        {word.text}
                        {idx < displayedWords.length - 1 && " "}
                    </span>
                ))}
                {!isComplete && currentWordIndex < words.length && (
                    <span className={styles.typewriter__word}>
                        {currentText}
                        <span className={`${styles.typewriter__cursor} ${cursorClassName}`}>
                            |
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
};
