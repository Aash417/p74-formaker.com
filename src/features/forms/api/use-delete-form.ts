import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
   (typeof client.api.hono.forms)[':formId']['$delete']
>;
type RequestType = InferRequestType<
   (typeof client.api.hono.forms)[':formId']['$delete']
>;

export function useDeleteForm() {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async ({ param }) => {
         const response = await client.api.hono.forms[':formId']['$delete']({
            param,
         });
         if (!response.ok) throw new Error('Failed to delete Form');

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success('Form deleted');
         queryClient.invalidateQueries({ queryKey: ['form', data.id] });
         queryClient.invalidateQueries({ queryKey: ['forms'] });
         router.replace('/dashboard');
      },
      onError: () => {
         toast.error('Failed to delete Form');
      },
   });

   return mutation;
}
