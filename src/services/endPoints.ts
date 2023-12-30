const Url = process.env.URL
const petsUrl = `${Url}/pets`

export const EndPoints = {
    pets: {
        getAll: `${petsUrl}/all`,
        getPetById: (id: string) => `${petsUrl}/${id}`,
    },
}

export const Options = {
    formData: {
        headers: {
            "Content-type": "multipart/form-data",
        },
    },
    json: {
        headers: {
            accept: "*/*",
            "Content-type": "application/json",
        },
    },
}
