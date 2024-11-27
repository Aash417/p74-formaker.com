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

export const ResponseFieldSchema = z.object({
   fieldId: z.string(),
   value: z.string(),
});

export const ResponseSchema = z.object({
   submittedBy: z.string().email(),
   responseFields: z.array(ResponseFieldSchema),
});
