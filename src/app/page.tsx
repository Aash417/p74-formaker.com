import { GlobeComponent } from '@/components/globe-component';
import { auth } from '@/lib/auth';

export default async function Page() {
   const session = await auth();
   return (
      <div className="flex h-full items-center justify-center">
         <GlobeComponent />
      </div>
   );
}
