import { LoadingCard } from "@/components/common/skeletons"
import { ListPets } from "@/pages/pets/ListPets"
import { Search } from "@/pages/pets/Search"
import { Suspense } from "react"

interface UrlProps {
    params: {
        pet: string //* pets/something,
    }
    searchParams?: {
        name: string
    }
}

export default function page({ params, searchParams }: UrlProps) {
    const { pet } = params
    let namePet

    if (searchParams) {
        const { name } = searchParams
        namePet = name
    }

    return (
        <section className="w-full dark:bg-neutral h-auto">
            <article className=" pt-3 w-11/12 my-0 mx-auto">
                <Search />

                <Suspense fallback={<LoadingCard />}>
                    <ListPets
                        kindaPets={pet}
                        name={namePet}
                    />
                </Suspense>
            </article>
        </section>
    )
}
