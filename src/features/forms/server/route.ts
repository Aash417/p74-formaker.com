import db from '@/lib/db';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { FieldType } from '@prisma/client';
import { Hono } from 'hono';
import { FormSchema } from './schemas';

export const formRoute = new Hono()
   .post('/', sessionMiddleware, zValidator('json', FormSchema), async (c) => {
      const userId = c.get('userId');
      const { title, description, fields } = c.req.valid('json');

      const result = await db.form.create({
         data: {
            title,
            description,
            creatorId: userId,
            fields: {
               create: fields.map((field) => ({
                  type: field.type as FieldType,
                  label: field.label,
                  isRequired: field.isRequired,
                  options: field.options ? JSON.stringify(field.options) : null,
               })),
            },
         },
         include: {
            fields: true,
         },
      });

      return c.json({
         data: result.id,
      });
   })
   .get('/', sessionMiddleware, async (c) => {
      const userId = c.get('userId');
      const result = await db.form.findMany({
         where: {
            creatorId: userId,
         },
      });

      return c.json({
         data: result,
      });
   })
   .get('/:formId', sessionMiddleware, async (c) => {
      const { formId } = c.req.param();

      const result = await db.form.findUnique({
         where: {
            id: formId,
         },
         include: {
            fields: true,
         },
      });

      return c.json({
         data: result,
      });
   })
   .delete('/:formId', sessionMiddleware, async (c) => {
      const { formId } = c.req.param();

      const result = await db.form.delete({
         where: {
            id: formId,
         },
      });

      return c.json({
         data: result,
      });
   });
