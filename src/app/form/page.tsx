'use client';

import { useCreateForm } from '@/features/forms/api/use-create-form';
import { FieldSchema } from '@/features/forms/server/schemas';
import { useState } from 'react';
import { z } from 'zod';

type FieldType = z.infer<typeof FieldSchema>;

export default function DynamicForm() {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const { mutate } = useCreateForm();

   const [fields, setFields] = useState<FieldType[]>([
      { type: 'text', label: '', options: '', isRequired: false },
   ]);

   const handleAddField = () => {
      setFields([
         ...fields,
         { type: 'text', label: '', options: '', isRequired: false },
      ]);
   };

   const handleFieldChange = (
      index: number,
      key: keyof FieldType,
      value: unknown,
   ) => {
      const updatedFields = fields.map((field, i) =>
         i === index ? { ...field, [key]: value } : field,
      );
      setFields(updatedFields);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title) {
         alert('Title is required!');
         return;
      }

      const formData = {
         title,
         description,
         fields,
      };

      mutate({ json: formData });
      console.log('Submitted Data:', formData);
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Title (required):
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     required
                  />
               </label>
            </div>

            <div>
               <label>
                  Description (optional):
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </label>
            </div>

            {fields.map((field, index) => (
               <div key={index}>
                  <label>
                     Label:
                     <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                           handleFieldChange(index, 'label', e.target.value)
                        }
                     />
                  </label>

                  <label>
                     Type:
                     <select
                        value={field.type}
                        onChange={(e) =>
                           handleFieldChange(index, 'type', e.target.value)
                        }
                     >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="radio">Radio</option>
                        <option value="select">Select</option>
                     </select>
                  </label>

                  {(field.type === 'radio' || field.type === 'select') && (
                     <label>
                        Options (comma-separated):
                        <input
                           type="text"
                           value={field.options}
                           onChange={(e) =>
                              handleFieldChange(
                                 index,
                                 'options',
                                 e.target.value,
                              )
                           }
                        />
                     </label>
                  )}

                  <label>
                     Required:
                     <input
                        type="checkbox"
                        checked={field.isRequired}
                        onChange={(e) =>
                           handleFieldChange(
                              index,
                              'isRequired',
                              e.target.checked,
                           )
                        }
                     />
                  </label>
               </div>
            ))}

            <button type="button" onClick={handleAddField}>
               Add Field
            </button>

            <button type="submit">Submit</button>
         </form>
      </div>
   );
}
