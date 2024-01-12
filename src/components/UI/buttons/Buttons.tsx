import React from "react"

interface HtmlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface ButtonProps extends HtmlProps {
    addClass?: string
}

export const ButtonSecondary = ({
    children,
    addClass,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-outline btn-secondary ${addClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export const ButtonPrimary = ({
    children,
    addClass,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`btn  btn-primary ${addClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export const ButtonAccent = ({ children, addClass, ...props }: ButtonProps) => {
    return (
        <button
            className={`btn btn-accent ${addClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export const ButtonWarning = ({
    children,
    addClass,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-warning ${addClass}`}
            {...props}
        >
            {children}
        </button>
    )
}
