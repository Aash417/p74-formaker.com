import { Card, CardContent } from '@/components/ui/card';
import MyForms from '@/features/forms/components/my-forms';
import Link from 'next/link';
import { IoAddSharp } from 'react-icons/io5';

export default function Page() {
   return (
      <div className="flex h-screen w-full flex-col bg-slate-50">
         <div className="flex h-[250px] w-full items-center bg-slate-100 py-2">
            <div className="ml-[150px] flex flex-col justify-center">
               <span className="ml-2"> Start a new Form</span>
               <Link href="/form">
                  <Card>
                     <CardContent>
                        <IoAddSharp size="100" className="pt-4" />
                     </CardContent>
                  </Card>
               </Link>
            </div>
         </div>

         <div className="mx-[150px] flex flex-col justify-center gap-y-3 py-5">
            <span className="ml-2">Your Forms</span>
            <MyForms />
         </div>
      </div>
   );
}
