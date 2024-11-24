import authConfig from '@/lib/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import db from './db';

export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(db),
   session: { strategy: 'jwt' },
   ...authConfig,
});
