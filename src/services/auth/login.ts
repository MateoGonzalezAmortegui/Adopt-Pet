import axios from "axios"
import { EndPoints, Options } from "../endPoints"
import { LoginDto } from "@/interfaces/LoginDto"

export const Login = async (data: LoginDto) => {
    try {
        const response = await axios.post(
            EndPoints.auth.login,
            data,
            Options.json
        )
        return response.data
    } catch (error: any) {
        return error.response
    }
}
