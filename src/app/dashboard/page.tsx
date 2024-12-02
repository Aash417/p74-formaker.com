import { Card, CardContent } from '@/components/ui/card';
import MyForms from '@/features/forms/components/my-forms';
import Link from 'next/link';
import { IoAddSharp } from 'react-icons/io5';

export default function Page() {
   return (
      <div className="flex min-h-screen w-full flex-grow flex-col bg-slate-50">
         <div className="flex h-[150px] w-full flex-col items-center bg-slate-100 py-2 sm:h-[200px] sm:flex-row sm:items-center">
            <div className="flex flex-col items-center justify-center sm:ml-[170px] sm:items-start">
               <span className="text-center sm:text-left">
                  Start a new Form
               </span>
               <Link href="/form">
                  <Card className="w-100">
                     <CardContent>
                        <IoAddSharp className="size-[70px] pt-4 sm:size-[90px]" />
                     </CardContent>
                  </Card>
               </Link>
            </div>
         </div>

         <div className="flex flex-col justify-center gap-y-3 px-4 py-5 sm:mx-[150px]">
            <span className="ml-2 text-left">Your Forms</span>
            <MyForms />
         </div>
      </div>
   );
}
