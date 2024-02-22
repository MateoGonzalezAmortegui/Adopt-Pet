"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { FormNewPet } from "@/templatePages/profile/createPet/FormNewPet"
import { Tittle } from "@/components/UI/texts"

export default function Page() {
    const { data: session } = useSession()
    const User = (session as any)?.user?.user
    const Token = (session as any)?.user?.access_token

    return (
        <>
            <Link
                href="/profile"
                className="hidden pt-4 md:flex dark:bg-neutral dark:text-white"
            >
                ❮ Volver a Mi perfil
            </Link>
            <section className="w-full h-auto pb-[44rem] dark:bg-neutral">
                <Tittle
                    text="Publica a tu mascota para que Encuentre un nuevo hogar!"
                    className="pt-4 text-center"
                />
                <FormNewPet
                    User={User}
                    Token={Token}
                />
            </section>
        </>
    )
}
