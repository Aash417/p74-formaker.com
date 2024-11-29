import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import UserButton from './user-button';

export default function Navbar() {
   return (
      <div className="flex items-center justify-between border-b p-2 pl-5 pr-5">
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

         <div className="flex items-center gap-x-5">
            <Button variant="link" asChild>
               <Link href="/dashboard">My Forms</Link>
            </Button>

            <UserButton />
         </div>
      </div>
   );
}
