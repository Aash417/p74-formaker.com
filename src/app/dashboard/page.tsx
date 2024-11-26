'use client';

import Loader from '@/components/loader';
import { useGetForms } from '@/features/forms/api/use-get-forms';
import Link from 'next/link';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

export default function Page() {
   const { data, isLoading } = useGetForms();

   return (
      <div>
         <div className="flex items-center">
            Create form
            <Link href="/form">
               <HiOutlineDocumentAdd size={50} />
            </Link>
         </div>

         {isLoading ? (
            <Loader />
         ) : (
            <div>
               Your forms
               <div>
                  {data?.map((el) => {
                     return (
                        <div key={el.id}>
                           <Link href={`/form/${el.id}`}>
                              {el.title} : {el.id}
                           </Link>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
}
