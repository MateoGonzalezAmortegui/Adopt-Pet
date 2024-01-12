import axios from "axios"
import { EndPoints, Options } from "../endPoints"
import { RegisterDto } from "@/interfaces/RegisterDto"

export const Register = async (data: RegisterDto) => {
    try {
        const response = await axios.post(
            EndPoints.auth.create,
            data,
            Options.json
        )
        return response.data
    } catch (error) {
        return error
    }
}
