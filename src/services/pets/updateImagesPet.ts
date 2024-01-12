import axios from "axios"
import { EndPoints } from "../endPoints"

export const updateImagesPet = async (id: string, data: any, token: string) => {
    try {
        const response = await axios.patch(
            EndPoints.pets.updateImages(id),
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
