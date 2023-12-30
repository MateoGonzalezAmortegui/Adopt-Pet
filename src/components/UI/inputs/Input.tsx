"use client"

import { ChangeEvent, useState } from "react"

interface TextInputProps {
    onInputChange?: (value: string) => void
}

export const TextInput: React.FC<TextInputProps> = ({
    onInputChange,
}: {
    onInputChange?: (value: string) => void
}) => {
    const [inputValue, setInputValue] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        if (onInputChange) {
            onInputChange(value)
        }
    }

    return (
        <input
            type="text"
            placeholder="Busca por su nombre"
            className="input input-bordered input-primary w-3/4 max-w-xs"
            value={inputValue}
            onChange={handleChange}
        />
    )
}
