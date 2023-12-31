import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

//* Components
import { Navbar } from "@/components/common/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Adopt Pet",
    description: "Adopcion de mascotas cerca tuyo!!",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}
