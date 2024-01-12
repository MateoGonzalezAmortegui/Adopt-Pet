const Url = process.env.NEXT_PUBLIC_BACKEND_URL
const petsUrl = `${Url}/pets`
const authUrl = `${Url}/auth`
const userUrl = `${Url}/users`
const authRegisterUrl = `${Url}/auth`

const UrlMaps = process.env.NEXT_PUBLIC_URL_GOOGLE_MAPS

export const EndPoints = {
    pets: {
        getAll: `${petsUrl}/all`,
        ofUser: (idUser: string) => `${petsUrl}/user/${idUser}`,
        create: `${petsUrl}`,
        getOne: (idPet: string) => `${petsUrl}/${idPet}`,
        updateInfo: (idPet: string) => `${petsUrl}/updateInfo/${idPet}`,
        updateImages: (idPet: string) => `${petsUrl}/updateImages/${idPet}`,
        delete: (idPet: string) => `${petsUrl}/${idPet}`,
    },
    users: {
        getById: (id: string) => `${userUrl}/${id}`,
        update: (id: string) => `${userUrl}/${id}`,
        delete: (id: string) => `${userUrl}/${id}`,
    },
    auth: {
        login: `${authUrl}/sing-in`,
        create: `${authRegisterUrl}/sign-up`,
    },
    googleMaps: {
        getDirection: (latitude: number, longitude: number) =>
            `${UrlMaps}?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
        putDirection: (direction: string) =>
            `${UrlMaps}?address=${encodeURIComponent(direction)}&key=${
                process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            }`,
    },
}

export const Options = {
    json: {
        headers: {
            "Content-Type": "application/json",
        },
    },
}
