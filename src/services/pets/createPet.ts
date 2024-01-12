import axios from "axios"
import { EndPoints } from "../endPoints"

export const createPet = async (data: any, token: string) => {
    try {
        const response = await axios.post(EndPoints.pets.create, data, {
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
