export type InputLogin = {
    email: string
    password: string
}

export type InputRegister = {
    username: string
    email: string
    password: string
    cellphone: string
}

export type InputUpdateUser = {
    username: string
    email: string
    cellphone: string
}

export interface InputCreatePet {
    name: string
    animal: string
    breed: string
    description: string
    gender: string
    years: string
    months: string
    direction: string
    vaccinations: any
}
