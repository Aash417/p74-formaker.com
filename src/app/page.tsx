import { auth } from '@/lib/auth';

export default async function Page() {
   const session = await auth();
   return (
      <div className="flex h-screen items-center justify-center">
         Welcome {JSON.stringify(session)}
      </div>
   );
}
