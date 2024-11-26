'use client';

import { useCreateForm } from '@/features/forms/api/use-create-form';
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
import { FieldEnumType, FieldType } from '@/features/forms/server/types';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useRef } from 'react';

export default function CreateDynamicForm() {
   const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
   const { mutate } = useCreateForm();

   const { control, handleSubmit, watch, setValue } = useForm({
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

   function onSubmit(data: any) {
      if (!data.title) {
         alert('Title is required!');
         return;
      }
      mutate({ json: data });
      console.log('Submitted Data:', data);
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
      <div>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
               <Label>Title (required):</Label>
               <Controller
                  name="title"
                  control={control}
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                     <Input {...field} placeholder="Enter the form title" />
                  )}
               />
            </div>

            <div>
               <Label>Description (optional):</Label>
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <Textarea
                        {...field}
                        placeholder="Enter the form description"
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
                  className="relative space-y-4 rounded border p-4"
               >
                  <div>
                     <Label>Label:</Label>
                     <Controller
                        name={`fields.${index}.label`}
                        control={control}
                        render={({ field }) => (
                           <Input
                              {...field}
                              placeholder="Enter the field label"
                           />
                        )}
                     />
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
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="text">Text</SelectItem>
                                 <SelectItem value="textarea">
                                    Textarea
                                 </SelectItem>
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
                           />
                        )}
                     />
                     <Label>Required</Label>

                     <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="link"
                        className="text-red-400"
                     >
                        Delete
                     </Button>
                  </div>
               </div>
            ))}

            <div className="flex justify-end gap-x-3">
               <Button variant="outline" type="button" onClick={handleAddField}>
                  Add Field
               </Button>

               <Button type="submit">Submit</Button>
            </div>
         </form>
      </div>
   );
}
