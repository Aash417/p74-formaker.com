import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Readonly<Props>) {
   return (
      <div className="flex h-screen items-center justify-center bg-slate-50 px-4 md:px-6">
         <Card>
            <CardHeader></CardHeader>
            <CardContent className="grid gap-4">
               <div className="max-w-md space-y-4 text-center">
                  <div className="inline-flex rounded-full bg-green-100 p-4 dark:bg-green-900">
                     <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     Form Submitted Successful
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                     <Button variant="link" asChild>
                        <Link
                           href={`${process.env.NEXT_PUBLIC_APP_URL}/form/${formId}/response`}
                        >
                           Submit another response
                        </Link>
                     </Button>
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

function CheckIcon(props: any) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M20 6 9 17l-5-5" />
      </svg>
   );
}
