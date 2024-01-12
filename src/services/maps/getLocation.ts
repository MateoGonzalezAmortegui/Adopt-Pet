import axios from "axios"
import { EndPoints } from "../endPoints"

export const getLocation = async (latitude: string, longitude: string) => {
    const latitudeNew = parseFloat(latitude)
    const longitudeNew = parseFloat(longitude)

    try {
        const response = await axios.get(
            EndPoints.googleMaps.getDirection(latitudeNew, longitudeNew)
        )
        return response.data.results[0].formatted_address
    } catch (error) {
        return error
    }
}
