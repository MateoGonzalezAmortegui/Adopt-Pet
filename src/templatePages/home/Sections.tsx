import { ButtonSecondary } from "@/components/UI/buttons"
import { ProfileIcon } from "@/components/icons/Profile"
import { SearchIcon } from "@/components/icons/Search"
import Link from "next/link"
import Image from "next/image"
export const Sections = () => {
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <Image
                        src="/pets.jpg"
                        alt="hero"
                        className="max-w-sm rounded-lg shadow-2xl"
                        width="250"
                        height="250"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            Encuentra a tu nuevo amigo!
                        </h1>
                        <p className="py-6">
                            Puedes publicar y ver todos los peluditos que
                            necesitan un nuevo hogar y asi poder ayudarles a que
                            tengan una mejor calidad de vida.
                        </p>
                        <Link href="/pets/all">
                            <ButtonSecondary>
                                <SearchIcon className="iconBg" /> Buscar
                            </ButtonSecondary>
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(/section.jpg)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            ¿Que esperas para registrarte?
                        </h1>
                        <p className="mb-5">
                            Y poder ayudar a publicar a todos los animalitos que
                            necesitan un hogar.
                        </p>
                        <Link href="/sign-up">
                            <button className="btn btn-primary">
                                <ProfileIcon className="iconBg" />
                                Registrate!
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
