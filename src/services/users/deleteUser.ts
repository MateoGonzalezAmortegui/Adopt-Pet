import axios from "axios"
import { EndPoints } from "../endPoints"

export const deleteUser = async (id: string, token: string) => {
    try {
        const response = await axios.get(EndPoints.users.delete(id), {
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
