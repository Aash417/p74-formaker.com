import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CreateDynamicForm from '@/features/forms/components/create-dynamic-form';

export default function Page() {
   return (
      <div>
         <Navbar />

         <div className="flex h-full items-center justify-center pt-4">
            <Card>
               <CardHeader></CardHeader>
               <CardContent>
                  <div className="w-[550px] space-y-6">
                     <CreateDynamicForm />
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
