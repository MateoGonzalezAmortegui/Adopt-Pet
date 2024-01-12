import { getAllPets } from "@/services/pets/getAllPets"
import { CardsPets } from "./CardsPets"
import { PetsDto } from "@/interfaces/PetsDto"
import { NotFoundPet } from "./NotFoundPet"

export const ListPets = async ({
    kindaPets,
    name,
}: {
    kindaPets: string
    name: string | undefined
}) => {
    let pets: PetsDto[] = await getAllPets()

    if (kindaPets == "Gato" || kindaPets == "Perro") {
        pets = pets.filter((pet) => pet.animal === kindaPets)
    }

    if (name !== undefined) {
        let nameFind = name.toLocaleLowerCase()
        pets = pets.filter((pet) => pet.name.toLowerCase() === nameFind)
    }

    return (
        <>
            {pets.length == 0 && <NotFoundPet name={name} />}
            <section className="grid grid-cols-1 justify-items-center gap-8 pt-8 pb-28 md:grid-cols-3 lg:grid-cols-5">
                {pets.map((pet, index) => (
                    <CardsPets
                        petInfo={pet}
                        key={index}
                        id={index}
                    />
                ))}
            </section>
        </>
    )
}
