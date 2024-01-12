"use client"

//* UI
import { ButtonPrimary } from "@/components/UI/buttons"
import { ErrorMessage, Paragraph, Tittle } from "@/components/UI/texts"

//* Validations
import { registerSchema } from "@/validations/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"

//* Auth
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Register } from "@/services/auth/register"

//* Types
import { InputRegister } from "@/interfaces/types/Inputs"

import "react-phone-number-input/style.css"

export default function Page() {
    const [Error, setError] = useState<string>()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<InputRegister>({
        resolver: zodResolver(registerSchema),
    })

    const router = useRouter()

    const onSubmit = handleSubmit(
        async ({ username, email, password, cellphone }) => {
            setError(undefined)

            const userRegister = await Register({
                username,
                email,
                password,
                cellphone,
            })

            if (userRegister?.response?.status == 409) {
                setError(userRegister.response.data.message)
                return
            } else {
                const responseNextAuth = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                })
                if (responseNextAuth?.error) {
                    return
                }
                router.push("/")
            }
        }
    )

    return (
        <>
            <section className="w-full h-screen pb-[44rem] dark:bg-neutral">
                <Tittle
                    text="Registrate"
                    className="pt-4 text-center"
                />
                <form
                    className="w-11/12 my-0 mx-auto grid justify-center"
                    onSubmit={onSubmit}
                >
                    <div className="pt-8">
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
                                {...register("username")}
                            />
                            {errors.username?.message && (
                                <ErrorMessage text={errors.username?.message} />
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
                                {...register("email")}
                            />
                            {errors.email?.message && (
                                <ErrorMessage text={errors.email?.message} />
                            )}
                        </label>
                    </div>

                    <div className="pt-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <Paragraph
                                    className="label-text"
                                    text="Password:"
                                />
                            </div>
                            <input
                                type="password"
                                className="input input-bordered input-primary w-full max-w-xs"
                                {...register("password")}
                            />
                        </label>
                        {errors.password?.message && (
                            <ErrorMessage text={errors.password?.message} />
                        )}
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
                                validate: (value) => isValidPhoneNumber(value),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                    value={value || ""}
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
                        Registrar
                    </ButtonPrimary>

                    {Error && (
                        <ErrorMessage
                            text={`· ${Error}`}
                            className="mt-6"
                        />
                    )}
                </form>
            </section>
        </>
    )
}
