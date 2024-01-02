"use client"
//* UI
import { TextInput } from "@/components/UI/inputs"
import { Paragraph, SubTittle } from "@/components/UI/texts"
import { ButtonPrimary } from "@/components/UI/buttons"

//* Icons
import { SearchIcon } from "@/components/icons/Search"
import { useState } from "react"

//* Nextjs
import { useRouter } from "next/navigation"
import { CatIcon } from "@/components/icons/Cat"
import { ButtonAccent, ButtonSecondary } from "@/components/UI/buttons/Buttons"
import { DogIcon } from "@/components/icons/Dog"

export const Search = () => {
    const router = useRouter()

    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (value: string) => {
        setInputValue(value)
        if (inputValue.length <= 1) {
            handleButtonAll()
        }
    }

    const handleButton = () => {
        router.push(`/pets/all?name=${inputValue}`)
    }

    const handleButtonPet = (kindaPet: string) => {
        router.push(`/pets/${kindaPet}`)
    }

    const handleButtonAll = () => {
        router.push(`/pets/all`)
    }
    return (
        <section>
            <article>
                <SubTittle text="Encuentra a tu nuevo amigo!" />
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
                    <div className="flex space-x-4 pt-3 sm:flex-row">
                        <TextInput onInputChange={handleInputChange} />
                        <ButtonPrimary onClick={handleButton}>
                            <SearchIcon className="iconBg" />
                        </ButtonPrimary>
                    </div>

                    <div className="flex items-center pt-4 space-x-3">
                        <Paragraph text="Busca por tipo de animal:" />

                        <ButtonAccent
                            className="btn-outline"
                            onClick={() => handleButtonPet("Perro")}
                        >
                            <DogIcon className="iconBg" />
                        </ButtonAccent>

                        <ButtonSecondary
                            className="btn-outline"
                            onClick={() => handleButtonPet("Gato")}
                        >
                            <CatIcon className="iconBg" />
                        </ButtonSecondary>

                        <ButtonPrimary
                            className="btn-outline"
                            onClick={handleButtonAll}
                        >
                            <DogIcon className="iconBg" />
                            <CatIcon className="iconBg" />
                        </ButtonPrimary>
                    </div>
                </div>
            </article>
        </section>
    )
}
