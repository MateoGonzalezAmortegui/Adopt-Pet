import React from "react"

interface ButtonProps {
    onClick?: () => void
    className?: string
    children?: React.ReactNode
    text?: string
}

export const ButtonSecondary: React.FC<ButtonProps> = ({
    onClick,
    className,
    children,
    text,
}) => {
    return (
        <button
            className={`btn btn-outline btn-secondary dark:btn-ghost ${className}`}
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    )
}

export const ButtonPrimary: React.FC<ButtonProps> = ({
    onClick,
    className,
    children,
    text,
}) => {
    return (
        <button
            className={`btn  btn-primary ${className}`}
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    )
}

export const ButtonAccent: React.FC<ButtonProps> = ({
    onClick,
    className,
    children,
    text,
}) => {
    return (
        <button
            className={`btn  btn-accent ${className}`}
            onClick={onClick}
        >
            {text}
            {children}
        </button>
    )
}
