import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

type ResponseType = InferResponseType<
   (typeof client.api.hono.forms)[':formId']['$get']
>;
export type GetFormResponseType = ResponseType['data'];

export function useGetForm(formId: string) {
   const query = useQuery<GetFormResponseType>({
      queryKey: ['form', formId],
      queryFn: async () => {
         const response = await client.api.hono.forms[':formId'].$get({
            param: { formId },
         });
         if (!response.ok) throw new Error('Failed to fetch form');

         const { data } = await response.json();
         return data;
      },
   });

   return query;
}
