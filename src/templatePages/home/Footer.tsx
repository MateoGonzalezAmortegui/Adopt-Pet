import { GitHubIcon } from "@/components/icons/GitHub"
import { LinkedinIcon } from "@/components/icons/Linkedin"
import Image from "next/image"
import Link from "next/link"
export const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <aside className="items-center grid-flow-col">
                <Image
                    src="/logo.png"
                    alt="hero"
                    className="max-w-sm rounded-lg shadow-2xl"
                    width="150"
                    height="133"
                />
                <p>Mateo Gonzalez Amortegui © 2024</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link
                    href="https://github.com/MateoGonzalezAmortegui"
                    target="_blank"
                >
                    <GitHubIcon className="fill-current text-white w-6 h-6" />
                </Link>

                <Link
                    href="https://www.linkedin.com/in/mateo-gonzalez-amortegui/"
                    target="_blank"
                >
                    <LinkedinIcon className="fill-current text-white w-6 h-6" />
                </Link>
            </nav>
        </footer>
    )
}
