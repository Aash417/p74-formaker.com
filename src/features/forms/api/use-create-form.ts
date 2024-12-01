import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.hono.forms)['$post']>;
type RequestType = InferRequestType<(typeof client.api.hono.forms)['$post']>;

export type CreateDynamicFormRequestType = RequestType['json'];

export function useCreateForm() {
   const router = useRouter();

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.hono.forms['$post']({ json });
         if (!response) throw new Error('Failed to create form');

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success('Form created');
         router.push(`/form/${data}`);
      },
   });

   return mutation;
}
