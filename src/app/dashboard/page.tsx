import React from 'react';

import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import Link from 'next/link';

export default async function Page() {
   const session = await auth();

   return (
      <div>
         <div className="flex items-center">
            Create form
            <Link href="/form">
               <HiOutlineDocumentAdd size={50} />
            </Link>
         </div>

         <div>Your forms</div>
      </div>
   );
}
