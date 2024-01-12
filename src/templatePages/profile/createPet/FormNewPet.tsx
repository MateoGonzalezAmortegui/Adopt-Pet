"use client"

//* UI
import { ButtonPrimary } from "@/components/UI/buttons"
import { ErrorMessage, Paragraph } from "@/components/UI/texts"

//* Validations
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Gender,
    KindaPet,
    createPetSchema,
} from "@/validations/createPetSchema"

//* Auth
import { useRef, useState } from "react"

//* Types
import { InputCreatePet } from "@/interfaces/types/Inputs"

//* services
import { createPet } from "@/services/pets/createPet"
import { putLocation } from "@/services/maps/putLocation"

//* Components
import { Info } from "@/components/common/alert/Info"
import { ModalLoading } from "@/components/common/modals/ModalLoading"
import { Success } from "@/components/common/alert/Succes"

interface SessionProps {
    User: any
    Token: string
}

export const FormNewPet = ({ User, Token }: SessionProps) => {
    const [Succes, setSucces] = useState(false)

    //* months and years
    const [Months, setMonths] = useState(false)
    const [ErrorYears, setErrorYears] = useState<string>()
    const [ErrorMonths, setErrorMonths] = useState<string>()

    const [ErrorImages, setErrorImages] = useState<string>()
    const [Images, setImages] = useState<FileList | null>()

    const inputYears = useRef<number>()
    const inputMonths = useRef<number>()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputCreatePet>({
        resolver: zodResolver(createPetSchema),
    })

    //* Data form
    const onSubmit = handleSubmit(async (data) => {
        if (inputYears.current == undefined) {
            return setErrorYears("Debe ser una edad valida")
        }
        if (inputMonths.current == undefined && inputYears.current == 0) {
            return setErrorMonths("Debe ser una edad valida")
        }
        if (Images == undefined || Images.length < 3) {
            return setErrorImages("Debes subir 3 imagenes de tu mascota")
        }

        const formData = new FormData()

        formData.append("userId", User._id)
        formData.append("name", data.name)
        formData.append("animal", data.animal)
        formData.append("breed", data.breed)
        formData.append("description", data.description)
        formData.append("gender", data.gender)

        //* years or months
        if (inputYears.current == 0) {
            formData.append("years", inputYears.current.toString())
            formData.append("months", Months.toString())
        } else {
            formData.append("years", inputYears.current.toString())
        }

        //* location
        const response = await putLocation(data.direction)
        formData.append("latitude", response.results[0].geometry.location.lat)
        formData.append("longitude", response.results[0].geometry.location.lng)

        //* vaccinations
        if (data.vaccinations !== "N/A") {
            const newVaccinations = data.vaccinations
                .split(",")
                .map((item: string) => item.trim())

            for (let i = 0; i < newVaccinations.length; i++) {
                formData.append("vaccinations[name][]", newVaccinations[i])
            }
        }

        //* images
        for (let i = 0; i < Images.length; i++) {
            formData.append("file", Images[i])
        }
        const modalElement = document.getElementById(
            "my_modal_Loading"
        ) as HTMLDialogElement | null

        if (modalElement) {
            modalElement.showModal()
        }

        const newPet = await createPet(formData, Token)
        if (newPet) {
            setSucces(true)
        }

        if (modalElement) {
            modalElement.close()
        }
    })

    //* Years Input
    const handleYearsChange = (value: number) => {
        inputYears.current = value
        if (value === 0) {
            setMonths(true)
        } else {
            if (Months !== false) {
                setMonths(false)
            }
        }

        if (value < 0 || value >= 11) {
            setErrorYears("Debe ser una edad valida")
        } else {
            setErrorYears("")
        }
    }

    //* Months Input
    const handleMonthsChange = (value: number) => {
        inputMonths.current = value

        if (value < 0 || value >= 11) {
            setErrorMonths("Debe ser una edad valida")
        } else {
            setErrorMonths("")
        }
    }

    const handleFileChange = () => {
        const selectedFiles = fileInputRef.current?.files

        if (selectedFiles) {
            setImages(selectedFiles)
        }
    }

    return (
        <>
            <form
                className="w-11/12 my-0 mx-auto"
                onSubmit={onSubmit}
            >
                <div className="pt-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Nombre de tu mascota:"
                            />
                        </div>
                        <input
                            type="text"
                            className="input input-bordered input-primary w-full max-w-xs"
                            {...register("name")}
                        />
                        {errors.name?.message && (
                            <ErrorMessage text={errors.name?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Tipo de mascota:"
                            />
                        </div>
                        <select
                            className="select select-primary w-full max-w-xs"
                            {...register("animal")}
                        >
                            {KindaPet.map((kinda) => (
                                <option key={kinda}>{kinda}</option>
                            ))}
                        </select>
                        {errors.animal?.message && (
                            <ErrorMessage text={errors.animal?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-4">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Raza:"
                            />
                        </div>
                        <input
                            type="text"
                            className="input input-bordered input-primary w-full max-w-xs"
                            {...register("breed")}
                        />
                        {errors.breed?.message && (
                            <ErrorMessage text={errors.breed?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-4">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Descripcion:"
                            />
                        </div>
                        <textarea
                            className="textarea textarea-primary"
                            placeholder="Bio"
                            {...register("description")}
                        ></textarea>
                        {errors.description?.message && (
                            <ErrorMessage text={errors.description?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Sexo de la mascota:"
                            />
                        </div>
                        <select
                            className="select select-primary w-full max-w-xs"
                            {...register("gender")}
                        >
                            {Gender.map((gender) => (
                                <option key={gender}>{gender}</option>
                            ))}
                        </select>
                        {errors.animal?.message && (
                            <ErrorMessage text={errors.animal?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-4">
                    <Info text="Poner 0 si aun no ha cumplido el año" />
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Años:"
                            />
                        </div>
                        <input
                            type="number"
                            className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(e) => {
                                handleYearsChange(Number(e.target.value))
                            }}
                        />
                    </label>
                    {ErrorYears && <ErrorMessage text={ErrorYears} />}
                </div>

                {Months && (
                    <div className="pt-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <Paragraph
                                    className="label-text"
                                    text="Meses:"
                                />
                            </div>
                            <input
                                type="number"
                                className="input input-bordered input-primary w-full max-w-xs"
                                onChange={(e) => {
                                    handleMonthsChange(Number(e.target.value))
                                }}
                            />
                        </label>
                        {ErrorMonths && <ErrorMessage text={ErrorMonths} />}
                    </div>
                )}

                <div className="pt-4">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Locacion:"
                            />
                        </div>
                        <input
                            type="text"
                            className="input input-bordered input-primary w-full max-w-xs"
                            {...register("direction")}
                        />
                        {errors.direction?.message && (
                            <ErrorMessage text={errors.direction?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-4">
                    <Info
                        text="Si tiene vacunas Escribirlas separadas por una
                                coma ',' . Si no tiene escribir N/A"
                    />

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Vacunas:"
                            />
                        </div>
                        <textarea
                            className="textarea textarea-primary"
                            placeholder="Bio"
                            {...register("vaccinations")}
                        ></textarea>
                        {errors.vaccinations?.message && (
                            <ErrorMessage text={errors.vaccinations?.message} />
                        )}
                    </label>
                </div>

                <div className="pt-4">
                    <Info text="Debes subir 3 imagenes de tu mascota" />
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <Paragraph
                                className="label-text"
                                text="Fotos:"
                            />
                        </div>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                            id="fileInput"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                        />

                        {ErrorImages && <ErrorMessage text={ErrorImages} />}
                    </label>
                </div>

                <ButtonPrimary addClass="w-full mt-8">Crear</ButtonPrimary>

                {Succes && (
                    <div className="mt-9">
                        <Success text="Se ha creado la mascota exitosamente!" />
                    </div>
                )}
            </form>

            <ModalLoading
                tittle="Creando mascota"
                text="Por favor, espere mientras se crea su mascota."
            />
        </>
    )
}
