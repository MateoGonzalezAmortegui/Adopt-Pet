import { PetsDto } from "@/interfaces/PetsDto"
import { UserInfo } from "@/interfaces/UserInfo"
import { getPetOfUser } from "@/services/pets/getPetOfUser"
import { InfoPet } from "./InfoPet"

export const InfoPetsTable = async ({
    User,
    token,
}: {
    User: UserInfo
    token: string
}) => {
    const pets: PetsDto[] = await getPetOfUser(User._id, token)
    return (
        <div className="overflow-x-auto pt-4">
            <table className="table">
                <thead>
                    <tr className="dark:text-white">
                        <th></th>
                        <th>Nombre</th>
                        <th>Animal</th>
                        <th>Raza</th>
                        <th>Descripcion</th>
                        <th>Genero</th>
                        <th>Años/meses</th>
                        <th>Locacion</th>
                        <th>Vacunas</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {pets &&
                        pets.map((pet, index) => (
                            <InfoPet
                                pet={pet}
                                index={index}
                                key={index}
                                Token={token}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    )
}
