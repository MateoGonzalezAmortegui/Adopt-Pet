import axios from "axios"
import { EndPoints } from "../endPoints"

export const getPetOfUser = async (idUser: string, token: string) => {
    try {
        const response = await axios.get(EndPoints.pets.ofUser(idUser), {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return error
    }
}
