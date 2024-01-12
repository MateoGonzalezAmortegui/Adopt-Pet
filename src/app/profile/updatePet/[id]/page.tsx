"use client"
//* UI
import { Tittle } from "@/components/UI/texts"

//* Components
import { FormUpdatePet } from "@/templatePages/profile/updatePet/FormUpdatePet"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Suspense } from "react"
import { LoadingPages } from "@/components/common/skeletons"

export default function Page() {
    const params = useParams()
    const { data: session } = useSession()
    const User = (session as any)?.user?.user
    const Token = (session as any)?.user?.access_token

    return (
        <>
            <Link
                href="/profile"
                className="hidden md:flex dark:bg-neutral dark:text-white"
            >
                ❮ Volver a Mi perfil
            </Link>
            <section className="w-full h-auto pb-[44rem] dark:bg-neutral">
                <Tittle
                    text="Edita la informacion o imagenes de tu mascota"
                    className="pt-4 text-center"
                />

                <Suspense fallback={<LoadingPages />}>
                    <FormUpdatePet
                        Token={Token}
                        User={User}
                        petId={params?.id}
                    />
                </Suspense>
            </section>
        </>
    )
}
