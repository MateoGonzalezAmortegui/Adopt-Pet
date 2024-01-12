import { z } from "zod"

export const KindaPet = ["Gato", "Perro"] as const

export const Gender = ["Macho", "Hembra"] as const

export const createPetSchema = z.object({
    name: z.string().min(4, {
        message: "El nombre de la mascota debe ser mayor a 4 caracteres",
    }),
    animal: z.enum(KindaPet, {
        errorMap: () => ({ message: "Este campo es obligatorio" }),
    }),
    breed: z.string().min(3, { message: "Debe ser un tipo de raza valido" }),
    description: z.string().min(20, {
        message: "La descripcion de la mascota debe ser mayor a 20 caracteres",
    }),
    gender: z.enum(Gender, {
        errorMap: () => ({ message: "Este campo es obligatorio" }),
    }),
    direction: z.string().min(10, {
        message: "Debe ser una dirreccion valida",
    }),
    vaccinations: z
        .string()
        .min(3, { message: "Debe ser un tipo de vacuna valida" }),
})
