import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../lib/db';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password === credentials.password) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
        newUser: '/register',
    },
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
        async register({ name, email, password }) {
            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    name,
                },
            });

            return user;
        },
    },
});