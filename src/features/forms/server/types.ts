import { z } from 'zod';
import { FieldSchema, FieldType, FormSchema } from './schemas';

export type FieldType = z.infer<typeof FieldSchema>;
export type FormType = z.infer<typeof FormSchema>;
export type FieldEnumType = z.infer<typeof FieldType>;
