import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export function useGetForms() {
   const query = useQuery({
      queryKey: ['forms'],
      queryFn: async () => {
         const response = await client.api.hono.forms.$get();

         if (!response.ok) throw new Error('Failed to fetch workspaces');

         const { data } = await response.json();
         return data;
      },
   });
   return query;
}
