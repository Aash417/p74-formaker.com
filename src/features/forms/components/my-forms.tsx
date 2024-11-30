'use client';

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { useGetForms } from '@/features/forms/api/use-get-forms';
import { format } from 'date-fns';
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link';

export default function MyForms() {
   const { data, isLoading } = useGetForms();

   if (isLoading)
      return (
         <div className="flex h-full justify-center pt-[200px]">
            <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
         </div>
      );

   if (data?.length === 0)
      return (
         <Card>
            <CardHeader>
               <div className="flex justify-center">No forms yet</div>
            </CardHeader>
            <CardContent>
               <div className="flex justify-center text-muted-foreground">
                  Select a blank form to get started
               </div>
            </CardContent>
         </Card>
      );

   return (
      <div className="grid grid-cols-4 gap-5">
         {data?.map((el) => {
            const words = el.title.split(' ');
            const limitedWords =
               words.length > 4
                  ? words.slice(0, 4).join(' ') + ' ...'
                  : words.join(' ');

            return (
               <Link href={`/form/${el.id}`} key={el.id}>
                  <Card>
                     <CardHeader>
                        <CardTitle>{limitedWords}</CardTitle>
                     </CardHeader>
                     <CardFooter className="text-sm text-muted-foreground">
                        created on :{' '}
                        {format(new Date(el.createdAt), 'dd/MM/yyyy')}
                     </CardFooter>
                  </Card>
               </Link>
            );
         })}
      </div>
   );
}
