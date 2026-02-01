"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from "react";

// Types
interface CardContainerContextType {
    mouseEnterCard: () => void;
    mouseLeaveCard: () => void;
    mouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    isMouseEntered: boolean;
}

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}

interface CardItemProps {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    translateZ?: number | string;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    [key: string]: any;
}

// Context for managing 3D card state
const CardContainerContext = createContext<CardContainerContextType | undefined>(
    undefined
);

export const useCardContainer = () => {
    const context = useContext(CardContainerContext);
    if (!context) {
        throw new Error("useCardContainer must be used within a CardContainer");
    }
    return context;
};

// CardContainer - Main wrapper with perspective
export const CardContainer: React.FC<CardContainerProps> = ({
    children,
    className,
    containerClassName,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = () => {
        setIsMouseEntered(true);
        if (!containerRef.current) return;
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <CardContainerContext.Provider
            value={{
                mouseEnterCard: handleMouseEnter,
                mouseLeaveCard: handleMouseLeave,
                mouseMove: handleMouseMove,
                isMouseEntered,
            }}
        >
            <div
                className={containerClassName}
                style={{
                    perspective: "1000px",
                }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={className}
                    style={{
                        transformStyle: "preserve-3d",
                        transition: "all 0.1s ease-out",
                    }}
                >
                    {children}
                </div>
            </div>
        </CardContainerContext.Provider>
    );
};

// CardBody - The actual card content
export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
    return (
        <div
            className={className}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </div>
    );
};

// CardItem - Individual elements that can be translated in 3D space
export const CardItem: React.FC<CardItemProps> = ({
    as: Tag = "div",
    children,
    className,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isMouseEntered } = useCardContainer();

    useEffect(() => {
        if (!ref.current) return;

        if (isMouseEntered) {
            ref.current.style.transform = `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = `translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    }, [isMouseEntered, translateZ, rotateX, rotateY, rotateZ]);

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                transition: "all 0.3s ease-out",
                transformStyle: "preserve-3d",
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
};
