//* UI
import { ButtonAccent, ButtonWarning } from "@/components/UI/buttons"
import { Paragraph } from "@/components/UI/texts"
import { ModalLoading } from "@/components/common/modals/ModalLoading"
import { EditIcon } from "@/components/icons/Edit"
import { TrashIcon } from "@/components/icons/Trash"

//* Interface
import { PetsDto } from "@/interfaces/PetsDto"

//* Maps
import { getLocation } from "@/services/maps/getLocation"
import { deletePet } from "@/services/pets/deletePet"

import Link from "next/link"

export const InfoPet = async ({
    pet,
    index,
    Token,
}: {
    pet: PetsDto
    index: number
    Token: string
}) => {
    const position = await getLocation(pet.latitude, pet.longitude)
    const DeletePet = async () => {
        const modalElement = document.getElementById(
            "my_modal_Loading"
        ) as HTMLDialogElement | null

        if (modalElement) {
            modalElement.showModal()
        }

        const Pet = await deletePet(pet._id, Token)

        if (modalElement) {
            modalElement.close()
        }
    }

    return (
        <>
            <tr className="dark:text-white">
                <th>{index}</th>
                <td>
                    <Paragraph text={pet.name} />
                </td>
                <td>{pet.animal}</td>
                <td>{pet.breed}</td>
                <td>{pet.description}</td>
                <td>{pet.gender}</td>
                <td className="text-center">
                    {pet.years == "0" ? pet.months : pet.years}
                </td>
                <td>{position}</td>
                <td>
                    {!pet.vaccinations && <td>No tiene vacunas</td>}
                    {pet.vaccinations &&
                        pet.vaccinations.name.map((vaccinations, index) => (
                            <p key={index}>{"· " + vaccinations}</p>
                        ))}
                </td>
                <td>
                    <Link href={`/profile/updatePet/${pet._id}`}>
                        <ButtonAccent addClass="text-white h-auto">
                            <EditIcon className="iconBg" />
                            Editar Mascota
                        </ButtonAccent>
                    </Link>
                </td>
                <td>
                    <ButtonWarning
                        addClass="text-white h-auto"
                        onClick={DeletePet}
                    >
                        <TrashIcon className="iconBg" />
                        Borrar Mascota
                    </ButtonWarning>
                </td>
            </tr>
            <ModalLoading
                tittle="Borrando mascota"
                text="Por favor, espere mientras se borra su mascota."
            />
        </>
    )
}
