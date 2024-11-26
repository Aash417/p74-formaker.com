import CreateDynamicForm from '@/features/forms/components/create-dynamic-form';

export default function Page() {
   return (
      <div className="grid h-screen place-items-center">
         <div className="w-11/12 rounded-lg p-10 md:w-3/4 lg:w-2/3 xl:w-1/2">
            <CreateDynamicForm />
         </div>
      </div>
   );
}
