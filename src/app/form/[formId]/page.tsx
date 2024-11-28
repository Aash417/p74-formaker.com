'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import Loader from '@/components/loader';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeleteForm } from '@/features/forms/api/use-delete-form';
import { useGetForm } from '@/features/forms/api/use-get-form';
import { useGetResponses } from '@/features/forms/api/use-get-responses';
import DataForm from '@/features/forms/components/data-form';
import DataResponses from '@/features/forms/components/data-responses';
import { Copy, PlusIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Readonly<Props>) {
   const currentURL = window.location.href;

   const { mutate } = useDeleteForm();
   const { data: forms, isLoading: loadingForms } = useGetForm(formId);
   const { data: responses, isLoading: loadingResponse } = useGetResponses({
      formId,
   });
   const isLoading = loadingForms || loadingResponse;

   function handleDelete() {
      mutate({ param: { formId } });
   }

   function handleCopy() {
      const link = `${currentURL}/response`;
      navigator.clipboard.writeText(link);
   }

   if (isLoading) return <Loader />;
   if (!forms || !responses)
      return (
         <div className="flex h-full items-center justify-center">
            Could not fetch data at the moment
         </div>
      );

   return (
      <div>
         <Navbar />

         <Tabs defaultValue="form" className="w-full flex-1 rounded-lg border">
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
                           <Button variant="outline">Send</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                           <DialogHeader>
                              <DialogTitle>Share link</DialogTitle>
                              <DialogDescription>
                                 Anyone who has this link will be able to submit
                                 response.
                              </DialogDescription>
                           </DialogHeader>

                           <div className="flex items-center space-x-2">
                              <div className="grid flex-1 gap-2">
                                 <Label htmlFor="link" className="sr-only">
                                    Link
                                 </Label>
                                 <Input
                                    id="link"
                                    defaultValue={`${currentURL}/response`}
                                    readOnly
                                 />
                              </div>
                              <Button
                                 onClick={handleCopy}
                                 type="submit"
                                 size="sm"
                                 className="px-3"
                              >
                                 <span className="sr-only">Copy</span>
                                 <Copy />
                              </Button>
                           </div>

                           <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                 <Button type="button" variant="secondary">
                                    Close
                                 </Button>
                              </DialogClose>
                           </DialogFooter>
                        </DialogContent>
                     </Dialog>

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

               <TabsContent value="form" className="mt-0">
                  <DataForm formData={forms} />
               </TabsContent>
               <TabsContent value="responses" className="mt-0">
                  <DataResponses data={responses} />
               </TabsContent>
            </div>
         </Tabs>
      </div>
   );
}
