import { ButtonPrimary } from "@/components/UI/buttons"
import { Paragraph, SubTittle } from "@/components/UI/texts"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
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
                src="/loadingCat.jpg"
                alt="not found image"
                width="250"
                height="250"
                className="rounded-md"
            />
            <Paragraph text="Esta pagina no existe 🛠️" />
            <Link href="/">
                <ButtonPrimary>Volver al Home!</ButtonPrimary>
            </Link>
        </section>
    )
}
