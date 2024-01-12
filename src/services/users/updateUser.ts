import axios from "axios"
import { EndPoints } from "../endPoints"
import { UpdateUser } from "@/interfaces/UpdateUser"

export const updateUser = async (
    id: string,
    data: UpdateUser,
    token: string
) => {
    try {
        const response = await axios.patch(EndPoints.users.update(id), data, {
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
