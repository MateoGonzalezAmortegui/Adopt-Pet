import { ButtonPrimary } from "@/components/UI/buttons"
import { SubTittle, Paragraph } from "@/components/UI/texts"
import Link from "next/link"
import Image from "next/image"
export const ErrorPage = () => {
    return (
        <section className="pt-4 pb-20 h-screen w-full grid items-center justify-items-center text-center dark:bg-neutral">
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
                className="rounded-md"
            />
            <Paragraph text="Parece que hubo un error 🛠️" />
            <Link href="/">
                <ButtonPrimary>Volver al Home!</ButtonPrimary>
            </Link>
        </section>
    )
}
