import authConfig from '@/lib/auth.config';
import NextAuth from 'next-auth';
import {
   apiAuthPrefix,
   publicRoutes,
   authRoutes,
   DEFAULT_LOGIN_REDIRECT,
} from './route';

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

   if (isApiAuthRoute) {
      return;
   }

   if (isAuthRoute) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
   }

   if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL('/auth/sign-in', nextUrl));
   }

   console.log('route : ', req.nextUrl.pathname);
   console.log('isloggedIn : ', isLoggedIn);

   return;
});

export const config = {
   matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
   ],
};
