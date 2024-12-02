import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CreateDynamicForm from '@/features/forms/components/create-dynamic-form';

export default function Page() {
   return (
      <div>
         <Navbar />
         <div className="h-screen bg-slate-50">
            <div className="flex justify-center bg-slate-50 p-4">
               <Card className="w-full max-w-3xl">
                  <CardHeader></CardHeader>
                  <CardContent>
                     <div className="space-y-6">
                        <CreateDynamicForm />
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
