import axios from "axios"
import { EndPoints } from "../endPoints"

export const updateInfoPet = async (id: string, data: any, token: string) => {
    try {
        const response = await axios.patch(
            EndPoints.pets.updateInfo(id),
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return error
    }
}
