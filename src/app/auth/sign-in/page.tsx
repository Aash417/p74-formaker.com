'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function Page() {
   function handleClick() {
      signIn('google', {
         callbackUrl: '/dashboard',
      });
   }
   return (
      <div className="flex h-screen items-center justify-center">
         <Button onClick={handleClick} variant="outline" size="lg">
            <FcGoogle className="mr-2 size-5" />
            Login with Google
         </Button>
      </div>
   );
}
