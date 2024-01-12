export interface PetsDto {
    _id: string
    userId: string
    name: string
    animal: string
    breed: string
    description: string
    gender: string
    years: string
    months: string
    latitude: string
    longitude: string
    vaccinations: Vaccination
    images: Image[]
}

interface Image {
    public_id: string
    secure_url: string
}

interface Vaccination {
    name: string[]
}
