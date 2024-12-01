'use client';

import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function Page() {
   function handleClick() {
      signIn('google', {
         callbackUrl: '/dashboard',
      });
   }

   return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 px-4">
         <Card className="mx-auto max-w-sm">
            <CardHeader>
               <CardTitle>Signin</CardTitle>
               <CardDescription>
                  Seamless one click signin with google.
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4">
                  <Button onClick={handleClick} variant="outline" size="lg">
                     <FcGoogle className="mr-2 size-5" />
                     Login with Google
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
