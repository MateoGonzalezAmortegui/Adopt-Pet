"use client"
//* Interfaces
import { PetsDto } from "@/interfaces/pets"

//* UI
import { Paragraph, SubTittle } from "@/components/UI/texts"

import Image from "next/image"
import { ModalPet } from "@/components/common/modals/ModalPet"

export const CardsPets = ({
    petInfo,
    id,
}: {
    petInfo: PetsDto
    id: number
}) => {
    const infoPet = (index: number) => {
        const modal = `modal_${index}`
        document.getElementById(modal).showModal()
    }

    return (
        <section>
            <article>
                <div
                    className="card bg-base-100 shadow-xl shadow-gray-400 cursor-pointer hover:shadow-primary dark:bg-black  "
                    onClick={() => infoPet(id)}
                >
                    <figure>
                        <Image
                            src={petInfo.images[0].secure_url}
                            alt="Imagen de la mascota"
                            key={petInfo.images[0].secure_url}
                            width="225"
                            height="300"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title dark:text-white">
                            {petInfo.name}
                            <div
                                className={
                                    petInfo.animal == "Perro"
                                        ? "badge badge-accent text-white"
                                        : "badge badge-secondary"
                                }
                            >
                                {petInfo.animal}
                            </div>
                        </h2>
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
                                        <li className="text-sm">
                                            {"* " + vaccinations}
                                        </li>
                                    </ul>
                                )
                            )}
                        <div className="card-actions justify-end">
                            {petInfo.years == "0" ? (
                                <div className="badge badge-outline">
                                    {`${petInfo.months} Meses`}
                                </div>
                            ) : (
                                <div className="badge badge-outline dark:text-white dark:bg-primary">
                                    {`${petInfo.years} Años`}
                                </div>
                            )}
                            <div className="badge badge-outline dark:text-white dark:bg-primary">
                                {petInfo.breed}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <ModalPet
                petInfo={petInfo}
                id={id}
            />
        </section>
    )
}
