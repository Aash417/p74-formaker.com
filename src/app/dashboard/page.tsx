import React from 'react';

import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';

export default async function Page() {
   const session = await auth();

   return (
      <div>
         Dashboard page
         <form
            action={async () => {
               'use server';

               await signOut();
            }}
         >
            <Button type="submit">singout</Button>
         </form>
         Welcome {JSON.stringify(session)}
      </div>
   );
}
