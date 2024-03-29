"use client"
import Link from "next/link"
import { useState } from "react"

//* Icons
import { CatIcon } from "@/components/icons/Cat"
import { GpsIcon } from "@/components/icons/Gps"
import { HomeIcon } from "@/components/icons/Home"
import { ProfileIcon } from "@/components/icons/Profile"

//* Buttons
import { ButtonSecondary } from "@/components/UI/buttons"

//* texts
import { Tittle } from "@/components/UI/texts"

//* Auth
import { signIn, signOut, useSession } from "next-auth/react"

export const Navbar = () => {
    const { data: session } = useSession()

    const [theme, setTheme] = useState<"light" | "dark">("light")

    const handleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
            document.documentElement.classList.add("dark")
        } else {
            setTheme("light")
            document.documentElement.classList.remove("dark")
        }
    }

    const links = [
        { href: "/", text: "HOME" },
        { href: "/pets/all", text: "PELUDITOS" },
        { href: "/maps", text: "CERCA TUYO" },
    ]

    return (
        <>
            {/* Mobile view*/}
            <header className="fixed left-0 bottom-0 z-50 w-full border-t-2 md:hidden">
                <nav className="navbar bg-white dark:bg-neutral">
                    <section className="navbar-start">
                        <article>
                            <Link
                                href="/"
                                className="btn btn-outline btn-primary"
                            >
                                <HomeIcon className="iconBg " />
                            </Link>
                        </article>
                    </section>

                    <section className="navbar-center space-x-2">
                        <article>
                            <Link
                                href="/pets/all"
                                className="btn btn-outline btn-secondary "
                            >
                                <CatIcon className="iconBg" />
                            </Link>
                        </article>
                        <article>
                            <Link
                                href="/maps"
                                className="btn btn-outline btn-accent"
                            >
                                <GpsIcon className="iconBg" />
                            </Link>
                        </article>
                        <article>
                            <label className="swap swap-rotate">
                                <input
                                    type="checkbox"
                                    className="theme-controller"
                                    value="synthwave"
                                    onClick={handleTheme}
                                />

                                <svg
                                    className="swap-on fill-current w-10 h-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                <svg
                                    className="swap-off fill-current w-10 h-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </article>
                    </section>

                    <section className="navbar-end">
                        <article>
                            <div className="flex-none">
                                <ul className="menu menu-horizontal px-1">
                                    <li>
                                        <details>
                                            <summary>
                                                <ProfileIcon className="iconBg" />
                                            </summary>
                                            <ul className="p-2 bg-base-100 rounded-t-none right-0 bottom-14 shadow-md shadow-neutral">
                                                {session ? (
                                                    <>
                                                        <li>
                                                            <Link href="/profile">
                                                                Mi Perfil
                                                            </Link>
                                                        </li>

                                                        <li
                                                            onClick={() =>
                                                                signOut()
                                                            }
                                                        >
                                                            <a className="text-red-600">
                                                                Salir
                                                            </a>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li>
                                                            <Link
                                                                className="text-green-600"
                                                                href="/sign-in"
                                                            >
                                                                Login
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/sign-up">
                                                                Registrate
                                                            </Link>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </section>
                </nav>
            </header>

            {/* Desktop view*/}
            <header className="w-full hidden md:flex  border-b-2 ">
                <nav className="navbar dark:bg-neutral">
                    <section className="navbar-start">
                        <Tittle text="ADOPT PET" />
                    </section>

                    <section className="navbar-center space-x-2">
                        {links.map((link) => (
                            <article key={link.text}>
                                <Link href={link.href}>
                                    <ButtonSecondary>
                                        {link.text}
                                    </ButtonSecondary>
                                </Link>
                            </article>
                        ))}
                        <article>
                            <label className="swap swap-rotate">
                                <input
                                    type="checkbox"
                                    className="theme-controller"
                                    value="synthwave"
                                    onClick={handleTheme}
                                />

                                <svg
                                    className="swap-on fill-current w-10 h-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                <svg
                                    className="swap-off fill-current w-10 h-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </article>
                    </section>

                    <section className="navbar-end">
                        <article>
                            <div className="flex-none">
                                <ul className="menu menu-horizontal px-1">
                                    <li>
                                        <details>
                                            <summary>
                                                <ProfileIcon className="iconBg" />
                                            </summary>
                                            <ul className="p-2 bg-base-100 rounded-t-none right-0 shadow-md shadow-neutral">
                                                {session ? (
                                                    <>
                                                        <li>
                                                            <Link href="/profile">
                                                                Mi Perfil
                                                            </Link>
                                                        </li>

                                                        <li
                                                            onClick={() =>
                                                                signOut()
                                                            }
                                                        >
                                                            <a className="text-red-600">
                                                                Salir
                                                            </a>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li>
                                                            <Link
                                                                className="text-green-600"
                                                                href="/sign-in"
                                                            >
                                                                Login
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/sign-up">
                                                                Registrate
                                                            </Link>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </section>
                </nav>
            </header>
        </>
    )
}
