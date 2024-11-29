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
         <div className="flex h-full justify-center">
            <div className="w-1/2 rounded-lg p-1 pb-7">
               <SubmitResponseForm data={{ ...data }} formId={formId} />
            </div>
         </div>
      );

   return <div>form not found</div>;
}
