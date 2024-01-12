interface TextProps {
    className?: string
    text: string
}

export const Tittle: React.FC<TextProps> = ({ className, text }) => {
    return (
        <h1 className={`font-bold text-lg dark:text-white ${className}`}>
            {text}
        </h1>
    )
}

export const SubTittle: React.FC<TextProps> = ({ className, text }) => {
    return (
        <h2 className={`font-bold text-lg dark:text-white ${className}`}>
            {text}
        </h2>
    )
}

export const Paragraph: React.FC<TextProps> = ({ className, text }) => {
    return <p className={`font-medium dark:text-white ${className}`}>{text}</p>
}

interface TextFormProps {
    className?: string
    text: string
}
export const ErrorMessage: React.FC<TextFormProps> = ({ className, text }) => {
    return <p className={`font-medium text-red-600 ${className}`}>{text}</p>
}
