'use client';

import Loader from '@/components/loader';
import { useDeleteForm } from '@/features/forms/api/use-delete-form';
import { useGetForm } from '@/features/forms/api/use-get-form';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Props) {
   const { data, isLoading } = useGetForm(formId);
   const { mutate } = useDeleteForm();

   function handleDelete() {
      mutate({ param: { formId } });
   }

   if (isLoading) return <Loader />;

   return (
      <>
         <div>{JSON.stringify(data)}</div>
         <div>
            <button onClick={handleDelete}>delete</button>
         </div>
      </>
   );
}
