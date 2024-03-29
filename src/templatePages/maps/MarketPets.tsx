"use client"
//* maps
import { Marker } from "@react-google-maps/api"

//* interfaces
import { PetsDto } from "@/interfaces/PetsDto"

//* components
import { ModalPet } from "@/components/common/modals/ModalPet"

export const MarkerPets = ({ pet, index }: { pet: PetsDto; index: number }) => {
    let positionPet = {
        lat: parseFloat(pet.latitude),
        lng: parseFloat(pet.longitude),
    }

    let Icon = `/${pet.animal}Loc.png`

    const infoPet = (index: number) => {
        const modal = `modal_${index}`
        const modalElement = document.getElementById(
            modal
        ) as HTMLDialogElement | null

        if (modalElement) {
            modalElement.showModal()
        }
    }

    return (
        <>
            <Marker
                position={positionPet}
                icon={{
                    url: Icon,
                    scaledSize: {
                        width: 35,
                        height: 35,
                    } as google.maps.Size,
                }}
                onClick={() => infoPet(index)}
            ></Marker>

            <ModalPet
                petInfo={pet}
                id={index}
            />
        </>
    )
}
