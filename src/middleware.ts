import authConfig from '@/lib/auth.config';
import NextAuth from 'next-auth';
import {
   apiAuthPrefix,
   publicRoutes,
   authRoutes,
   DEFAULT_LOGIN_REDIRECT,
} from './route';

export const { auth } = NextAuth(authConfig);

export const isPublicRoute = (pathname: string) => {
   // Match exact static routes
   if (publicRoutes.includes(pathname)) return true;

   // Match dynamic public routes
   const dynamicPublicRoutes = [
      /^\/form\/[^/]+\/response$/, // Match /form/:formId/response
      /^\/api\/hono\/forms\/[^/]+\/responses$/, // Match /api/hono/forms/:formId/responses
      /^\/api\/hono\/forms\/[^/]+$/, // Match /api/hono/forms/:formId
   ];
   return dynamicPublicRoutes.some((pattern) => pattern.test(pathname));
};

export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
   const isPublic = isPublicRoute(nextUrl.pathname);
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

   if (!isLoggedIn && !isPublic) {
      return Response.redirect(new URL('/', nextUrl));
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
