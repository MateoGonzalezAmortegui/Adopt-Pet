import axios from "axios"
import { EndPoints } from "../endPoints"

export const deletePet = async (id: string, token: string) => {
    try {
        const response = await axios.delete(EndPoints.pets.delete(id), {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return error
    }
}
