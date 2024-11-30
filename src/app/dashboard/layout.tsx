import UserButton from '@/components/user-button';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <main>
         <div className="flex h-[50px] items-center justify-between border-b p-2 pl-5 pr-5">
            <div className="relative flex flex-row items-center gap-1 text-lg font-semibold">
               <Link href="/">
                  <Image
                     src="/logo.svg"
                     alt="logo"
                     width={30}
                     height={30}
                     className="m-0 p-0"
                  />
               </Link>
            </div>

            <UserButton />
         </div>

         {children}
      </main>
   );
}
