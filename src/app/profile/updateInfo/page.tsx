"use client"

//* UI
import { ButtonPrimary } from "@/components/UI/buttons"
import { ErrorMessage, Paragraph, Tittle } from "@/components/UI/texts"

//* Validations
import { updateUserSchema } from "@/validations/updateUserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"

//* Auth
import { useSession } from "next-auth/react"
import { useState } from "react"

//* Types
import { InputUpdateUser } from "@/interfaces/types/Inputs"

import "react-phone-number-input/style.css"
import { updateUser } from "@/services/users/updateUser"
import Link from "next/link"
import { Info } from "@/components/common/alert/Info"

export default function Page() {
    const { data: session } = useSession()
    const User = (session as any)?.user?.user
    const Token = (session as any)?.user?.access_token

    const [Error, setError] = useState<string>()
    const [Succes, setSucces] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<InputUpdateUser>({
        resolver: zodResolver(updateUserSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        setError(undefined)

        const userUpdate = await updateUser(User._id, data, Token)
        console.log(userUpdate)
        if (userUpdate?.response?.status == 409) {
            setError(userUpdate.response.data.message)
            return
        } else {
            setSucces(true)
        }
    })

    return (
        <>
            {User && (
                <>
                    <Link
                        href="/profile"
                        className="hidden md:flex"
                    >
                        ❮ Volver a Mi perfil
                    </Link>

                    <section className="w-full h-screen pb-[44rem] dark:bg-neutral">
                        <Tittle
                            text="Editar Informacion de Usuario"
                            className="pt-4 text-center"
                        />
                        <Info
                            text="Escribe tu misma informacion actual si no la
                                deseas cambiar"
                        />

                        <form
                            className="w-11/12 my-0 mx-auto grid justify-center items-center pb-28"
                            onSubmit={onSubmit}
                        >
                            <div className="pt-2">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <Paragraph
                                            className="label-text"
                                            text="Nombre de Usuario:"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        className="input input-bordered input-primary w-full max-w-xs"
                                        placeholder={User.username}
                                        {...register("username")}
                                    />
                                    {errors.username?.message && (
                                        <ErrorMessage
                                            text={errors.username?.message}
                                        />
                                    )}
                                </label>
                            </div>

                            <div className="pt-4">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <Paragraph
                                            className="label-text"
                                            text="Email:"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        className="input input-bordered input-primary w-full max-w-xs"
                                        placeholder={User.email}
                                        {...register("email")}
                                    />
                                    {errors.email?.message && (
                                        <ErrorMessage
                                            text={errors.email?.message}
                                        />
                                    )}
                                </label>
                            </div>

                            <div className="pt-4">
                                <label
                                    htmlFor="cellphone"
                                    className="form-control w-full max-w-xs"
                                >
                                    <div className="label">
                                        <Paragraph
                                            className="label-text"
                                            text="Numero de Celular:"
                                        />
                                    </div>
                                </label>
                                <Controller
                                    name="cellphone"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        validate: (value) =>
                                            isValidPhoneNumber(value),
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <PhoneInput
                                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                            value={value || User.cellphone}
                                            onChange={onChange}
                                            defaultCountry="CO"
                                            id="cellphone"
                                        />
                                    )}
                                />
                                {errors.cellphone && (
                                    <ErrorMessage text="Numero Invalido" />
                                )}
                            </div>

                            <ButtonPrimary addClass="w-full mt-8">
                                Actualizar informacion
                            </ButtonPrimary>

                            {Error && (
                                <ErrorMessage
                                    text={`· ${Error}`}
                                    className="mt-6"
                                />
                            )}
                            {Succes && (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Usuario actualizado con exito!</span>
                                </div>
                            )}
                        </form>
                    </section>
                </>
            )}
        </>
    )
}
