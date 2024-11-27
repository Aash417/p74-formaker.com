import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
   return (
      <div>
         <div className="flex items-center justify-between border-b p-3 pl-5 pr-5">
            <div className="relative flex flex-row items-center gap-1 text-lg font-semibold">
               <Link href="/dashboard">
                  <Image
                     src="/logo.svg"
                     alt="logo"
                     width={30}
                     height={30}
                     className="m-0 p-0"
                  />
               </Link>
            </div>
            <Button variant="outline" size="sm" asChild>
               <Link href="/auth/sign-in">Get started</Link>
            </Button>
         </div>

         <div className="flex h-full items-center justify-center">
            Landing page
         </div>
      </div>
   );
}
