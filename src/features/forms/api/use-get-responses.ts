import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export type GetFormResponsesResponseType = {
   submittedBy: string;
} & Record<string, string>;

export function useGetResponses({ formId }: { formId: string }) {
   const query = useQuery<GetFormResponsesResponseType[]>({
      queryKey: ['responses', formId],
      queryFn: async () => {
         const response = await client.api.hono.forms[':formId'][
            'responses'
         ].$get({ param: { formId } });

         if (!response.ok) throw new Error('Failed to fetch workspaces');

         const { data } = await response.json();
         return data;
      },
   });
   return query;
}
