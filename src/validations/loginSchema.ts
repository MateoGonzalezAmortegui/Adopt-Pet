import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Debe ser un email valido" }),
    password: z
        .string()
        .min(5, { message: "La contraseña debe ser mayor a 5 caracteres" }),
})
