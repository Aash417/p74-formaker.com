import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
   (typeof client.api.hono.forms)[':formId']['responses']['$post']
>;
type RequestType = InferRequestType<
   (typeof client.api.hono.forms)[':formId']['responses']['$post']
>;

export function useCreateResponse(formId: string) {
   const router = useRouter();
   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json, param: { formId } }) => {
         const response = await client.api.hono.forms[':formId'].responses[
            '$post'
         ]({ json, param: { formId } });
         if (!response) throw new Error('Failed to create response');

         return await response.json();
      },
      onSuccess: () => {
         toast.success('Response submitted');
         router.replace(
            `${process.env.NEXT_PUBLIC_APP_URL}/form/${formId}/response/success`,
         );
      },
   });

   return mutation;
}
