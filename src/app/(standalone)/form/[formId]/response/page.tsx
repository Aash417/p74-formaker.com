'use client';

import Loader from '@/components/loader';
import PageNotFound from '@/components/page-not-found';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGetForm } from '@/features/forms/api/use-get-form';
import SubmitResponseForm from '@/features/forms/components/submit-response-form';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Readonly<Props>) {
   const { data, isLoading } = useGetForm(formId);

   if (isLoading) return <Loader />;

   if (data)
      return (
         <div className="h-screen bg-slate-50">
            <div className="flex justify-center bg-slate-50 p-4">
               <Card>
                  <CardHeader></CardHeader>
                  <CardContent>
                     <div className="w-[550px] space-y-6">
                        <SubmitResponseForm
                           data={{ ...data }}
                           formId={formId}
                        />
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      );

   return <PageNotFound />;
}
