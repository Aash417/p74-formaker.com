import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SubmitResponseForm from '@/features/forms/components/submit-response-form';
import db from '@/lib/db';

type Props = {
   params: { formId: string };
};

export default async function Page({ params: { formId } }: Props) {
   const formExists = await db.form.findUnique({
      where: {
         id: formId,
      },
   });

   const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/hono/forms/${formId}`;

   const response = await fetch(url);
   if (!response.ok) {
      return (
         <div className="flex h-screen items-center">
            There was an error fetching the data.
         </div>
      );
   }
   const { data } = await response.json();

   if (!!formExists)
      return (
         <div className="flex h-full justify-center py-4">
            <Card>
               <CardHeader></CardHeader>
               <CardContent>
                  <div className="w-[550px] space-y-6">
                     <SubmitResponseForm data={{ ...data }} formId={formId} />
                  </div>
               </CardContent>
            </Card>
         </div>
      );

   return <div>form not found</div>;
}
