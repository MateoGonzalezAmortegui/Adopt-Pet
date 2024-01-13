import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

//* Components
import { Navbar } from "@/components/common/navbar"
import SessionAuthProvider from "@/context/SessionAuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Adopt Pet",
    description: "Adopcion de mascotas cerca tuyo!!",
    keywords: ["adopcion", "mascotas", "gato", "perro"],
    manifest: "/manifest.json",
    icons: {
        apple: "/icon.png",
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionAuthProvider>
                    <Navbar />
                    <main>{children}</main>
                </SessionAuthProvider>
            </body>
        </html>
    )
}
