'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateResponse } from '@/features/forms/api/use-create-response';
import { Controller, useForm } from 'react-hook-form';

type Props = {
   formId: string;
   data: any;
};

export default function SubmitResponseForm({ formId, data }: Readonly<Props>) {
   const { mutate } = useCreateResponse(formId);

   const { title, description, fields } = data;
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   function onSubmit(values: any) {
      const responseFields = fields.map((field: any) => ({
         fieldId: field.id,
         value: values[field.id] || '',
      }));

      const finalValues = {
         submittedBy: values['submittedBy'],
         responseFields,
      };

      mutate({ json: finalValues, param: { formId } });
   }

   return (
      <>
         <div className="space-y-2">
            <div className="flex gap-x-3 text-2xl">
               <p className="font-bold">Title</p>
               <p className="font-bold">:</p>
               <p>{title}</p>
            </div>

            <div className="flex gap-x-3 text-xl text-muted-foreground">
               <p className="font-bold">Description</p>
               <p className="font-bold">:</p>
               <p>{description}</p>
            </div>
         </div>

         <DottedSeparator className="pt-3" />

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="pt-2">
               <Label>
                  Tell us who is submitting the form.
                  <span className="text-red-500">*</span>
               </Label>
               <Controller
                  name="submittedBy"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Input
                        {...field}
                        type="email"
                        placeholder="aashish@mail.com"
                     />
                  )}
               />
               {errors['submittedBy'] && (
                  <p className="text-sm text-red-500">Email is required.</p>
               )}
            </div>

            {fields?.map((el: any) => (
               <div key={el.id} className="space-y-2">
                  <Label>
                     {el.label}{' '}
                     {el.isRequired && <span className="text-red-500">*</span>}
                  </Label>

                  {el.type === 'text' && (
                     <Controller
                        name={el.id}
                        control={control}
                        rules={{ required: el.isRequired }}
                        render={({ field }) => (
                           <Input {...field} placeholder={el.label} />
                        )}
                     />
                  )}

                  {el.type === 'textarea' && (
                     <Controller
                        name={el.id}
                        control={control}
                        rules={{ required: el.isRequired }}
                        render={({ field }) => (
                           <Textarea {...field} placeholder={el.label} />
                        )}
                     />
                  )}

                  {el.type === 'radio' && el.options && (
                     <Controller
                        name={el.id}
                        control={control}
                        rules={{ required: el.isRequired }}
                        render={({ field }) => (
                           <RadioGroup
                              {...field}
                              value={field.value} // Bind the value from the form state
                              onValueChange={(value) => field.onChange(value)} // Update the form state on change
                              key={el.id}
                           >
                              {el
                                 .options!.slice(1, -1)
                                 .split(',')
                                 .map((option: string, idx: number) => (
                                    <div
                                       className="flex items-center space-x-2"
                                       key={idx + 1}
                                    >
                                       <RadioGroupItem value={option.trim()} />
                                       <Label>{option.trim()}</Label>
                                    </div>
                                 ))}
                           </RadioGroup>
                        )}
                     />
                  )}

                  {el.type === 'select' && el.options && (
                     <Controller
                        name={el.id}
                        control={control}
                        rules={{ required: el.isRequired }}
                        render={({ field }) => (
                           <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                           >
                              <SelectTrigger ref={field.ref}>
                                 <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent>
                                 {el
                                    .options!.slice(1, -1)
                                    .split(',')
                                    .map((option: string, idx: number) => (
                                       <SelectItem
                                          key={idx + 1}
                                          value={option.trim()}
                                       >
                                          {option.trim()}
                                       </SelectItem>
                                    ))}
                              </SelectContent>
                           </Select>
                        )}
                     />
                  )}

                  {errors[el.id] && (
                     <p className="text-sm text-red-500">
                        {el.label} is required.
                     </p>
                  )}
               </div>
            ))}

            <div className="flex justify-end">
               <Button type="submit">Submit Response</Button>
            </div>
         </form>
      </>
   );
}
