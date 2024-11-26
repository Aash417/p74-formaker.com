'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeleteForm } from '@/features/forms/api/use-delete-form';
import { useGetForm } from '@/features/forms/api/use-get-form';
import DataForm from '@/features/forms/components/data-form';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Props) {
   const { data, isLoading } = useGetForm(formId);
   const { mutate } = useDeleteForm();
   const [view, setView] = useQueryState('form-view', {
      defaultValue: 'form',
   });

   function handleDelete() {
      mutate({ param: { formId } });
   }

   if (isLoading) return <Loader />;
   if (!data)
      return (
         <div className="flex h-full items-center justify-center">
            Coundnt fetch data at the moment
         </div>
      );

   return (
      <Tabs
         defaultValue={view}
         onValueChange={setView}
         className="w-full flex-1 rounded-lg border"
      >
         <div className="flex h-full flex-col overflow-auto p-4">
            <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
               <TabsList className="w-full lg:w-auto">
                  <TabsTrigger value="form" className="h-8 w-full lg:w-auto">
                     Form
                  </TabsTrigger>
                  <TabsTrigger
                     value="responses"
                     className="h-8 w-full lg:w-auto"
                  >
                     Responses
                  </TabsTrigger>
               </TabsList>

               <div className="flex gap-x-3">
                  <Dialog>
                     <DialogTrigger asChild>
                        <Button variant="outline">Delete</Button>
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                           <DialogTitle>Delete this form</DialogTitle>
                           <DialogDescription>
                              This action cannot be undone. Are you sure you
                              want to permanently delete this form.
                           </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                           <Button
                              onClick={handleDelete}
                              type="submit"
                              variant="destructive"
                           >
                              Delete
                           </Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>

                  <Button size="sm" className="w-full lg:w-auto" asChild>
                     <Link href="/form">
                        <PlusIcon className="mr-2 size-4" />
                        New
                     </Link>
                  </Button>
               </div>
            </div>
            <DottedSeparator className="my-5" />

            {isLoading ? (
               <Loader />
            ) : (
               <>
                  <TabsContent value="form" className="mt-0">
                     <DataForm formData={data} />
                  </TabsContent>
                  <TabsContent value="responses" className="mt-0">
                     responses
                  </TabsContent>
               </>
            )}
         </div>
      </Tabs>
   );
}
