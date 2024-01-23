import { ButtonPrimary } from "@/components/UI/buttons"
import { SubTittle, Paragraph } from "@/components/UI/texts"
import Link from "next/link"
import Image from "next/image"
export const ErrorPage = () => {
    return (
        <section className="bg-neutral h-screen w-full grid items-center justify-items-center text-center">
            <div>
                <h1 className="text-primary text-5xl">500</h1>

                <SubTittle
                    className="text-warning text-3xl"
                    text="Server error"
                />
            </div>
            <Image
                src="/sadCat.jpeg"
                alt="error image"
                width="250"
                height="250"
            />
            <Paragraph
                text="Parece que hubo un error al llamar los datos 🛠️"
                className="text-white"
            />
            <Link href="pets/all">
                <ButtonPrimary>Intentar de nuevo!</ButtonPrimary>
            </Link>
        </section>
    )
}
