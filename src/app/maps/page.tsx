import { PetsDto } from "@/interfaces/PetsDto"
import { GoogleMapView } from "@/templatePages/maps/GoogleMapView"
import { getAllPets } from "@/services/pets/getAllPets"

export default async function page() {
    let pets: PetsDto[] = await getAllPets()
    return <GoogleMapView pets={pets} />
}
