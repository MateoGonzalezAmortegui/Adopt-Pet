import { LoginDto } from "@/interfaces/LoginDto"
import { Login } from "@/services/auth/login"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "test@test.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const login: LoginDto = {
                    email: credentials?.email,
                    password: credentials?.password,
                }

                const user = await Login(login)
                if (user?.status == 401) throw user.data
                return user
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any
            return session
        },
    },

    pages: {
        signIn: "/sign-in",
        signOut: "/",
    },
})

export { handler as GET, handler as POST }
