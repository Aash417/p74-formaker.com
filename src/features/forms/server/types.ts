import { z } from 'zod';
import {
   FieldSchema,
   FieldType,
   FormSchema,
   ResponseFieldSchema,
   ResponseSchema,
} from './schemas';

export type FieldType = z.infer<typeof FieldSchema>;
export type FormType = z.infer<typeof FormSchema>;
export type FieldEnumType = z.infer<typeof FieldType>;

export type ResponseType = z.infer<typeof ResponseSchema>;
export type ResponseFieldType = z.infer<typeof ResponseFieldSchema>;
