import axios from "axios"
import { EndPoints } from "../endPoints"

export const getOnePet = async (idPet: string, token: string) => {
    try {
        const response = await axios.get(EndPoints.pets.getOne(idPet), {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        return error
    }
}
