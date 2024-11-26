import { LoaderIcon } from 'lucide-react';

export default function Loader() {
   return (
      <div className="flex h-screen flex-col items-center justify-center">
         <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
      </div>
   );
}
