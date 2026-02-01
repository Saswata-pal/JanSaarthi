import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

export default function Container({
    children,
    className = '',
    as: Component = 'div'
}: ContainerProps) {
    return (
        <Component className={`container ${className}`}>
            {children}
        </Component>
    );
}
