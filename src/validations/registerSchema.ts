import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(5, {
        message: "El nombre de usuario debe ser mayor a 5 caracteres",
    }),
    email: z.string().email({ message: "Debe ser un email valido" }),
    password: z
        .string()
        .min(5, { message: "La contraseña debe ser mayor a 5 caracteres" }),
    cellphone: z.string().refine((value) => isValidPhoneNumber(value), {
        message: "Número de celular no válido",
    }),
})
