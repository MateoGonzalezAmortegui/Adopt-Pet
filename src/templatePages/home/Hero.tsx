import { ButtonAccent } from "@/components/UI/buttons"
import { GpsIcon } from "@/components/icons/Gps"
import Link from "next/link"
export const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(/hero.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        Encuentra a tu nuevo amigo!
                    </h1>
                    <p className="mb-5">
                        Aca puedes buscar y encontrar varios tipos de mascotas
                        que estan cerca a tu posicion!.
                    </p>
                    <Link href="/maps">
                        <ButtonAccent addClass="text-white">
                            <GpsIcon className="iconBg" /> Cerca tuyo
                        </ButtonAccent>
                    </Link>
                </div>
            </div>
        </div>
    )
}
