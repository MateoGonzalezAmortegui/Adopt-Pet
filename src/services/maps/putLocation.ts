import axios from "axios"
import { EndPoints } from "../endPoints"

export const putLocation = async (direction: string) => {
    try {
        const response = await axios.get(
            EndPoints.googleMaps.putDirection(direction)
        )
        return response.data
    } catch (error) {
        return error
    }
}
