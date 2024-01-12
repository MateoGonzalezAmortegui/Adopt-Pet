import { Paragraph } from "@/components/UI/texts"
import Image from "next/image"
export const NotFoundPet = ({ name }: { name: string | undefined }) => {
    if (name == undefined) {
        name = ""
    }
    return (
        <article className="pt-6 grid justify-center">
            <Image
                src="/loadingCat.png"
                alt="Mascota no encontrada"
                width="500"
                height="400"
                className="rounded-lg"
            />
            <h3 className="py-2 dark:text-white">
                No hay ninguna mascota con este nombre:
            </h3>
            <div className="text-center">
                <Paragraph text={name} />
            </div>
        </article>
    )
}
