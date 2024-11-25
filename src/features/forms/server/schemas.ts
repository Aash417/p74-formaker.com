import { z } from 'zod';

export const FieldType = z.enum(['text', 'textarea', 'radio', 'select']);

export const FieldSchema = z.object({
   type: FieldType,
   label: z.string(),
   options: z.string().optional(),
   isRequired: z.boolean().default(false),
});

export const FormSchema = z.object({
   title: z.string(),
   description: z.string().optional(),
   fields: z.array(FieldSchema),
});
