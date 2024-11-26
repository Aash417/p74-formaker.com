import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
   return (
      <div className="sticky flex items-center justify-between border-b p-4 pl-5 pr-5">
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
   );
}
