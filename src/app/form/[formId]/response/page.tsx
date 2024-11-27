import Image from 'next/image';
import Link from 'next/link';
import SubmitResponseForm from '@/features/forms/components/submit-response-form';
import { Button } from '@/components/ui/button';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Props) {
   return (
      <div>
         <div className="flex items-center justify-between border-b p-2 pl-5 pr-5">
            <div className="relative flex flex-row items-center gap-1 text-lg font-semibold">
               <Link href="/dashboard">
                  <Image
                     src="/logo.svg"
                     alt="logo"
                     width={30}
                     height={30}
                     className="m-0 p-0"
                  />
               </Link>
            </div>
            <Button variant="link" asChild>
               <Link href="/">Create your own forms</Link>
            </Button>
         </div>

         <div className="flex h-full justify-center">
            <div className="w-1/2 rounded-lg p-1 pb-7">
               <SubmitResponseForm formId={formId} />
            </div>
         </div>
      </div>
   );
}
