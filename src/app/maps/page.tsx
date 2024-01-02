import { PetsDto } from "@/interfaces/pets"
import { GoogleMapView } from "@/pages/maps/GoogleMapView"
import { getAllPets } from "@/services/pets/getAllPets"

export default async function page() {
    let pets: PetsDto[] = await getAllPets()
    return <GoogleMapView pets={pets} />
}
