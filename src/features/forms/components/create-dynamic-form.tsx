'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
   CreateDynamicFormRequestType,
   useCreateForm,
} from '@/features/forms/api/use-create-form';
import { FieldEnumType, FieldType } from '@/features/forms/server/types';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

export default function CreateDynamicForm() {
   const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
   const { mutate, isPending } = useCreateForm();

   const {
      control,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         title: '',
         description: '',
         fields: [
            {
               type: 'text',
               label: '',
               isRequired: false,
               options: '',
            },
         ] as FieldType[],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'fields',
   });

   function onSubmit(data: CreateDynamicFormRequestType) {
      mutate({ json: data });
   }

   function handleAddField() {
      append({
         type: 'text',
         label: '',
         isRequired: false,
         options: '',
      });

      setTimeout(() => {
         const newFieldIndex = fields.length;
         const newFieldRef = fieldRefs.current[newFieldIndex];
         if (newFieldRef) {
            newFieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
      }, 100);
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <div>
            <Label>
               Title<span className="text-red-500">*</span> :
            </Label>
            <Controller
               name="title"
               control={control}
               rules={{ required: 'Title is required' }}
               render={({ field }) => (
                  <Input
                     {...field}
                     placeholder="Enter a title for form"
                     className={cn(
                        'hover:border-black hover:shadow-md',
                        errors['title'] && 'border-destructive',
                     )}
                     disabled={isPending}
                  />
               )}
            />
            {errors['title'] && (
               <p className="text-sm text-red-500">Title is required.</p>
            )}
         </div>

         <div>
            <Label>Description :</Label>
            <Controller
               name="description"
               control={control}
               render={({ field }) => (
                  <Textarea
                     {...field}
                     placeholder="Give a brief description"
                     disabled={isPending}
                     className="hover:border-black hover:shadow-md"
                  />
               )}
            />
         </div>

         {fields.map((field, index) => (
            <div
               key={field.id}
               ref={(el) => {
                  fieldRefs.current[index] = el;
               }}
               className="relative space-y-4 rounded border p-4 hover:border-black hover:shadow-md"
            >
               <div>
                  <Label>
                     Label<span className="text-red-500">*</span> :
                  </Label>
                  <Controller
                     name={`fields.${index}.label`}
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="Enter the field label"
                           className={cn(
                              errors.fields?.[index]?.label &&
                                 'border-destructive',
                           )}
                           disabled={isPending}
                        />
                     )}
                  />
                  {errors.fields?.[index]?.label && (
                     <p className="text-sm text-red-500">Label is required.</p>
                  )}
               </div>

               <div>
                  <Label>Type:</Label>
                  <Controller
                     name={`fields.${index}.type`}
                     control={control}
                     render={({ field }) => (
                        <Select
                           {...field}
                           onValueChange={(value: FieldEnumType) =>
                              setValue(`fields.${index}.type`, value)
                           }
                           disabled={isPending}
                        >
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </div>

               {(watch(`fields.${index}.type`) === 'radio' ||
                  watch(`fields.${index}.type`) === 'select') && (
                  <div>
                     <Label>Options (comma-separated):</Label>
                     <Controller
                        name={`fields.${index}.options`}
                        control={control}
                        render={({ field }) => (
                           <Input
                              {...field}
                              placeholder="Enter options, separated by commas"
                              disabled={isPending}
                           />
                        )}
                     />
                  </div>
               )}

               <div className="flex items-center space-x-2">
                  <Controller
                     name={`fields.${index}.isRequired`}
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                           disabled={isPending}
                        />
                     )}
                  />
                  <Label>Required</Label>

                  <Button
                     type="button"
                     onClick={() => remove(index)}
                     variant="link"
                     className="text-red-400"
                     disabled={isPending}
                  >
                     Delete
                  </Button>
               </div>
            </div>
         ))}

         <div className="flex justify-between gap-x-3">
            <Button
               variant="outline"
               type="button"
               onClick={handleAddField}
               disabled={isPending}
            >
               Add Field
            </Button>

            <Button type="submit" disabled={isPending}>
               Create
            </Button>
         </div>
      </form>
   );
}
