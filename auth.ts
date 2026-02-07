import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import connectToDatabase from './lib/db';
import User from './models/User';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                await connectToDatabase();

                const user = await User.findOne({ email: credentials?.email }).select('+password');

                if (!user) {
                    throw new Error('User not found.');
                }

                const isPasswordCorrect = await compare(credentials?.password as string, user.password);

                if (!isPasswordCorrect) {
                    throw new Error('Invalid credentials');
                }

                return { id: user._id, email: user.email, role: user.role };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }: any) {
            if (token?.sub) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
});
