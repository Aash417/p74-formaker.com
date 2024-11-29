import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Props) {
   return (
      <div>
         success Page
         <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/form/${formId}/response`}
         >
            <Button variant="link">Submit another response</Button>
         </Link>
      </div>
   );
}
