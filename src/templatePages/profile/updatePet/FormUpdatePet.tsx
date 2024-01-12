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
import { Suspense, useEffect, useRef, useState } from "react"

//* Types
import { InputCreatePet } from "@/interfaces/types/Inputs"

//* services
import { putLocation } from "@/services/maps/putLocation"

//* Components
import { Info } from "@/components/common/alert/Info"
import { ModalLoading } from "@/components/common/modals/ModalLoading"
import { Success } from "@/components/common/alert/Succes"
import { PetsDto } from "@/interfaces/PetsDto"

import Image from "next/image"
import { updateImagesPet } from "@/services/pets/updateImagesPet"
import { updateInfoPet } from "@/services/pets/updateInfoPet"
import { getOnePet } from "@/services/pets/getOnePet"
import { LoadingPages } from "@/components/common/skeletons"

interface SessionProps {
    User: any
    Token: string
    petId: any
}

export const FormUpdatePet = ({ User, Token, petId }: SessionProps) => {
    const [pet, setpet] = useState<any>(undefined)

    const getPet = async () => {
        const response: any = await getOnePet(petId, Token)
        setpet(response.data)
    }

    useEffect(() => {
        getPet()
    })

    const [Succes, setSucces] = useState<boolean>(false)

    //* months and years
    const [Months, setMonths] = useState<boolean>(false)
    const [ErrorYears, setErrorYears] = useState<string>()
    const [ErrorMonths, setErrorMonths] = useState<string>()

    /* const [ErrorImages, setErrorImages] = useState<string>()
    const [Images, setImages] = useState<FileList | null>() */

    const inputYears = useRef<number>()
    const inputMonths = useRef<number>()
    const fileInputRef = useRef(null)

    /* const [Indexes, setIndexes] = useState<number[]>([])
    const [imagesPosition1, setimagesPosition1] = useState<boolean>(false)
    const [imagesPosition2, setimagesPosition2] = useState<boolean>(false)
    const [imagesPosition3, setimagesPosition3] = useState<boolean>(false)
 */
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

        const modalElement = document.getElementById(
            "my_modal_Loading"
        ) as HTMLDialogElement | null

        if (modalElement) {
            modalElement.showModal()
        }

        const updatePet = await updateInfoPet(pet._id, formData, Token)

        if (updatePet) {
            setSucces(true)
        }
        if (modalElement) {
            modalElement.close()
        }
    })

    /* const Onsubmit = async (e: any) => {
        e.preventDefault()
        if (Images == undefined || Images.length < Indexes.length) {
            setIndexes([])
            return setErrorImages(
                "Debes subir la misma cantidad de imagenes seleccionadas"
            )
        }
        const formData = new FormData()
        Indexes.forEach((index, i) => {
            formData.append(`indexes[${i}]`, index.toString())
        })

        //* images
        for (let i = 0; i < Images.length; i++) {
            formData.append("file", Images[i])
        }

        document.getElementById("my_modal_Loading").showModal()

        const updatePet = await updateImagesPet(pet._id, formData, Token)
        console.log(updatePet)
        if (updatePet) {
            setSucces(true)
        }
        document.getElementById("my_modal_Loading").close()
        setIndexes([])
    } */

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

    /* const handleFileChange = () => {
        setImages(fileInputRef.current.files)
    } */

    //* Indexes Images
    /* const SelectImage = (index: number) => {
        setIndexes((prevIndex) => [...prevIndex, index])
        if (index == 0) {
            setimagesPosition1(true)
        } else if (index == 1) {
            setimagesPosition2(true)
        } else if (index == 2) {
            setimagesPosition3(true)
        }
    } */

    return (
        <>
            <Info
                text="Escribe tu misma informacion actual si no la
                                deseas cambiar"
            />
            {pet && (
                <>
                    <Suspense fallback={<LoadingPages />}>
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
                                        placeholder={pet.name}
                                        {...register("name")}
                                    />
                                    {errors.name?.message && (
                                        <ErrorMessage
                                            text={errors.name?.message}
                                        />
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
                                        <ErrorMessage
                                            text={errors.animal?.message}
                                        />
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
                                        placeholder={pet.breed}
                                        {...register("breed")}
                                    />
                                    {errors.breed?.message && (
                                        <ErrorMessage
                                            text={errors.breed?.message}
                                        />
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
                                        placeholder={pet.description}
                                        {...register("description")}
                                    ></textarea>
                                    {errors.description?.message && (
                                        <ErrorMessage
                                            text={errors.description?.message}
                                        />
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
                                            <option key={gender}>
                                                {gender}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.animal?.message && (
                                        <ErrorMessage
                                            text={errors.animal?.message}
                                        />
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
                                        placeholder={pet.years}
                                        onChange={(e) => {
                                            handleYearsChange(
                                                Number(e.target.value)
                                            )
                                        }}
                                    />
                                </label>
                                {ErrorYears && (
                                    <ErrorMessage text={ErrorYears} />
                                )}
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
                                                handleMonthsChange(
                                                    Number(e.target.value)
                                                )
                                            }}
                                        />
                                    </label>
                                    {ErrorMonths && (
                                        <ErrorMessage text={ErrorMonths} />
                                    )}
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
                                        <ErrorMessage
                                            text={errors.direction?.message}
                                        />
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
                                        placeholder={pet.vaccinations?.name[0]}
                                        {...register("vaccinations")}
                                    ></textarea>
                                    {errors.vaccinations?.message && (
                                        <ErrorMessage
                                            text={errors.vaccinations?.message}
                                        />
                                    )}
                                </label>
                            </div>

                            <ButtonPrimary addClass="w-full mt-8">
                                Actualizar solo Informacion
                            </ButtonPrimary>
                        </form>

                        {/*  <form
                            className="w-11/12 my-0 mx-auto"
                            onSubmit={Onsubmit}
                        >
                            <div className="pt-6">
                                <Info text="Selecciona las fotos que desees cambiar y sube los archivo, Se debe cambiar solo 2 fotos" />
                                <div className="carousel w-full pt-4">
                                    <div
                                        id={`item${pet._id}_1`}
                                        className="carousel-item w-full justify-center"
                                    >
                                        <Image
                                            src={pet.images[0].secure_url}
                                            alt="Imagen de la mascota"
                                            width="225"
                                            height="300"
                                            className={`cursor-pointer ${
                                                imagesPosition1
                                                    ? "mask mask-squircle"
                                                    : ""
                                            }`}
                                            onClick={() => SelectImage(0)}
                                        />
                                    </div>

                                    <div
                                        id={`item${pet._id}_2`}
                                        className="carousel-item w-full justify-center"
                                    >
                                        <Image
                                            src={pet.images[1].secure_url}
                                            alt="Imagen de la mascota"
                                            width="225"
                                            height="300"
                                            className={`cursor-pointer ${
                                                imagesPosition2
                                                    ? "mask mask-squircle"
                                                    : ""
                                            }`}
                                            onClick={() => SelectImage(1)}
                                        />
                                    </div>
                                    <div
                                        id={`item${pet._id}_3`}
                                        className="carousel-item w-full justify-center"
                                    >
                                        <Image
                                            src={pet.images[2].secure_url}
                                            alt="Imagen de la mascota"
                                            width="225"
                                            height="300"
                                            className={`cursor-pointer ${
                                                imagesPosition3
                                                    ? "mask mask-squircle"
                                                    : ""
                                            }`}
                                            onClick={() => SelectImage(2)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center w-full py-2 gap-2">
                                    <a
                                        href={`#item${pet._id}_1`}
                                        className="btn btn-primary btn-xs"
                                    >
                                        1
                                    </a>
                                    <a
                                        href={`#item${pet._id}_2`}
                                        className="btn btn-primary btn-xs"
                                    >
                                        2
                                    </a>
                                    <a
                                        href={`#item${pet._id}_3`}
                                        className="btn btn-primary btn-xs"
                                    >
                                        3
                                    </a>
                                </div>
                                <Paragraph
                                    text={`Haz seleccionado ${Indexes.length} Imagenes`}
                                />
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

                                    {ErrorImages && (
                                        <ErrorMessage text={ErrorImages} />
                                    )}
                                </label>
                            </div>
                            <ButtonPrimary addClass="w-full mt-8">
                                Actualizar solo fotos
                            </ButtonPrimary>
                        </form> */}
                        {Succes && (
                            <div className="mt-9">
                                <Success text="Se ha actualizado la mascota exitosamente!" />
                            </div>
                        )}
                    </Suspense>
                </>
            )}

            <ModalLoading
                tittle="Editando mascota"
                text="Por favor, espere mientras se edita su mascota."
            />
        </>
    )
}
