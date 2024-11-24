// export type { Form } from '@prisma/client';
// export type { Field } from '@prisma/client';
// export type { FieldType } from '@prisma/client';

import { z } from 'zod';

export const FieldType = z.enum(['text', 'textarea', 'radio', 'select']);

export const FieldSchema = z.object({
   formId: z.string(),
   type: FieldType,
   label: z.string(),
   options: z.string().optional(),
   isRequired: z.boolean().default(false),
});

export const FormSchema = z.object({
   title: z.string(),
   description: z.string().optional(),
   createdAt: z.date().default(() => new Date()),
   creatorId: z.string(),
   fields: z.array(FieldSchema),
});
