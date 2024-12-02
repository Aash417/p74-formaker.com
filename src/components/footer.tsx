import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
   return (
      <section className="bg-gray-50 py-10 sm:pt-16">
         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between px-4">
               <div className="flex items-center gap-2">
                  <Image
                     src="/logo.svg"
                     alt="logo"
                     width={30}
                     height={30}
                     className="m-0 p-0"
                  />

                  <span className="text-2xl">Formaker.com</span>
               </div>

               <ul className="flex items-center space-x-3">
                  <li>
                     <Link
                        href="https://x.com/aashish_kathait"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-600"
                     >
                        <FaXTwitter className="size-4" />
                     </Link>
                  </li>

                  <li>
                     <Link
                        href="https://github.com/Aash417/p74-formaker.com"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-600"
                     >
                        <FaGithub className="size-4" />
                     </Link>
                  </li>
               </ul>
            </div>

            <hr className="mb-6 mt-6 border-gray-200" />

            <p className="text-center text-sm text-gray-600">
               Built by
               <Link
                  href="https://x.com/aashish_kathait"
                  className="pl-1 text-black underline"
               >
                  aashish
               </Link>
               . The source code is available on
               <Link
                  href="https://github.com/Aash417/p74-formaker.com"
                  className="pl-1 text-black underline"
               >
                  GitHub
               </Link>
            </p>
         </div>
      </section>
   );
}
