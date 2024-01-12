"use client"

//* UI
import { ButtonPrimary } from "@/components/UI/buttons"
import { ErrorMessage, Paragraph, Tittle } from "@/components/UI/texts"

//* Validations
import { loginSchema } from "@/validations/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//* Auth
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

//* Types
import { InputLogin } from "@/interfaces/types/Inputs"

export default function Page() {
    const [Error, setError] = useState<string>()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputLogin>({
        resolver: zodResolver(loginSchema),
    })

    const router = useRouter()

    const onSubmit = handleSubmit(async ({ email, password }) => {
        setError(undefined)
        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        if (responseNextAuth?.error) {
            setError(responseNextAuth.error)
            return
        }
        router.push("/")
    })

    return (
        <>
            <section className="w-full h-screen dark:bg-neutral">
                <Tittle
                    text="Login"
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

                    <ButtonPrimary addClass="w-full mt-8">Login</ButtonPrimary>

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
