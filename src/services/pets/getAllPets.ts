import axios from "axios"
import { EndPoints } from "../endPoints"

export const getAllPets = async () => {
    try {
        const response = await axios.get(EndPoints.pets.getAll)
        return response.data
    } catch (error) {
        return error
    }
}
