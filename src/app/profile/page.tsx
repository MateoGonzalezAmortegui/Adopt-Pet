"use client"
//*UI
import { SubTittle } from "@/components/UI/texts"
import { ButtonPrimary, ButtonWarning } from "@/components/UI/buttons"

//* Components
import { AddIcon } from "@/components/icons/Add"
import { InfoUser } from "@/templatePages/profile/InfoUser"
import { InfoPetsTable } from "@/templatePages/profile/InfoPetsTable"

//* Services
import { deleteUser } from "@/services/users/deleteUser"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { LoadingPages } from "@/components/common/skeletons"
import { TrashIcon } from "@/components/icons/Trash"

export default function Page() {
    const { data: session } = useSession()
    const User = (session as any)?.user?.user
    const Token = (session as any)?.user?.access_token

    const router = useRouter()

    const DeleteAccount = async () => {
        const succes = await deleteUser(User._id, Token)
        if (succes) {
            router.push("/")
        }
    }

    return (
        <>
            <section className="w-full h-auto dark:bg-neutral">
                <article className="w-11/12 my-0 mx-auto pt-4 pb-28">
                    <SubTittle
                        text="Mi Perfil"
                        className="text-center"
                    />
                    {User && <InfoUser User={User} />}

                    <SubTittle
                        text="Mis publicaciones de mascotas"
                        className="text-center pt-6"
                    />

                    {User && (
                        <Suspense fallback={<LoadingPages />}>
                            <InfoPetsTable
                                User={User}
                                token={Token}
                            />
                        </Suspense>
                    )}

                    <div className="w-full flex justify-center pt-5 space-y-4">
                        <Link href="profile/createPet">
                            <ButtonPrimary>
                                <AddIcon className="iconBg" />
                                Crear nueva mascota
                            </ButtonPrimary>
                        </Link>
                    </div>

                    <div className="w-full flex justify-center pt-5 space-y-4">
                        <ButtonWarning
                            addClass="text-white"
                            onClick={DeleteAccount}
                        >
                            <TrashIcon className="iconBg" />
                            Borrar Cuenta
                        </ButtonWarning>
                    </div>
                </article>
            </section>
        </>
    )
}
