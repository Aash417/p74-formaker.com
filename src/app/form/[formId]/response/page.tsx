import SubmitResponseForm from '@/features/forms/components/submit-response-form';

type Props = {
   params: { formId: string };
};

export default function Page({ params: { formId } }: Props) {
   return (
      <div className="flex h-full justify-center">
         <div className="w-1/2 rounded-lg p-1 pb-7">
            <SubmitResponseForm formId={formId} />
         </div>
      </div>
   );
}
