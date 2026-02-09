import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isOnboarded = user.isOnboarded;
            }
            return token;
        },

        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
                session.user.isOnboarded = token.isOnboarded;
            }
            return session;
        },

        // ⭐ SMART REDIRECT
        async redirect({ baseUrl }: any) {
            return `${baseUrl}/auth-redirect`;
        },
    },

    session: {
        strategy: "jwt" as const,
    },

    pages: {
        signIn: "/auth/signin",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
