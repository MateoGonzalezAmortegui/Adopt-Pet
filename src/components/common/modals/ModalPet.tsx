"use client"
import { Paragraph, SubTittle } from "@/components/UI/texts"
import { PetsDto } from "@/interfaces/PetsDto"
import { getLocation } from "@/services/maps/getLocation"
import { getUser } from "@/services/users/getUser"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ModalPet = ({ petInfo, id }: { petInfo: PetsDto; id: number }) => {
    const { data: session } = useSession()
    const [infoUser, setInfoUser] = useState<any>(null)
    const [position, setPosition] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const Token = (session as any)?.user?.access_token

                try {
                    const data = await getUser(petInfo.userId, Token)
                    setInfoUser(data)
                } catch (error) {
                    console.error("Error fetching user data", error)
                }
            }

            try {
                const loc = await getLocation(
                    petInfo.latitude,
                    petInfo.longitude
                )
                setPosition(loc)
            } catch (error) {
                console.error("Error fetching location data", error)
            }
        }

        fetchData()
    }, [session, petInfo.latitude, petInfo.longitude])

    const modal = `modal_${id}`
    const item1 = `item${id}_1`
    const item2 = `item${id}_2`
    const item3 = `item${id}_3`

    return (
        <dialog
            id={modal}
            className="modal"
        >
            <div className="modal-box w-11/12 max-w-5xl grid grid-cols-1 md:grid-cols-2 dark:bg-neutral">
                <section>
                    <div className="carousel w-full">
                        <div
                            id={item1}
                            className="carousel-item w-full justify-center"
                        >
                            <Image
                                src={petInfo.images[0].secure_url}
                                alt="Imagen de la mascota"
                                width="225"
                                height="300"
                                className="mask mask-squircle"
                            />
                        </div>

                        <div
                            id={item2}
                            className="carousel-item  w-full justify-center"
                        >
                            <Image
                                src={petInfo.images[1].secure_url}
                                alt="Imagen de la mascota"
                                width="225"
                                height="300"
                                className="mask mask-squircle"
                            />
                        </div>

                        <div
                            id={item3}
                            className="carousel-item  w-full justify-center"
                        >
                            <Image
                                src={petInfo.images[2].secure_url}
                                alt="Imagen de la mascota"
                                width="225"
                                height="300"
                                className="mask mask-squircle"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full py-2 gap-2">
                        <a
                            href={`#${item1}`}
                            className="btn btn-primary btn-xs"
                        >
                            1
                        </a>
                        <a
                            href={`#${item2}`}
                            className="btn btn-primary btn-xs"
                        >
                            2
                        </a>
                        <a
                            href={`#${item3}`}
                            className="btn btn-primary btn-xs"
                        >
                            3
                        </a>
                    </div>
                </section>

                <section>
                    <div className="card-body">
                        <SubTittle text={petInfo.name} />
                        <Paragraph text={petInfo.description} />
                        {petInfo.vaccinations ? (
                            <SubTittle text="Vacunas:" />
                        ) : (
                            <SubTittle text="No tiene Vacunas" />
                        )}
                        {petInfo.vaccinations &&
                            petInfo.vaccinations.name.map(
                                (vaccinations, index) => (
                                    <ul key={index}>
                                        <li className="text-sm dark:text-white">
                                            {"· " + vaccinations}
                                        </li>
                                    </ul>
                                )
                            )}
                        <div className="card-actions justify-end">
                            {petInfo.years == "0" ? (
                                <div className="badge badge-outline bg-accent dark:text-white">
                                    {`${petInfo.months} Meses`}
                                </div>
                            ) : (
                                <div className="badge badge-outline bg-accent dark:text-white ">
                                    {`${petInfo.years} Años`}
                                </div>
                            )}
                            <div className="badge badge-outline bg-accent dark:text-white ">
                                {petInfo.breed}
                            </div>
                        </div>
                        <SubTittle text="Estoy ubicado en:" />
                        {position && <Paragraph text={position} />}

                        <SubTittle text="Informacion de Contacto:" />
                        {infoUser ? (
                            <>
                                <Paragraph text={infoUser.email} />
                                <Paragraph text={infoUser.cellphone} />
                            </>
                        ) : (
                            <Paragraph text="Debes estar Logeado para ver esta informacion" />
                        )}
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn dark:text-white">
                                Cerrar
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </dialog>
    )
}
