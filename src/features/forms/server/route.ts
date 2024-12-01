import db from '@/lib/db';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { FieldType } from '@prisma/client';
import { Hono } from 'hono';
import { FormSchema, ResponseSchema } from './schemas';

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
   .get('/:formId', async (c) => {
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
   })
   .post(
      '/:formId/responses',
      zValidator('json', ResponseSchema),
      async (c) => {
         const { formId } = c.req.param();
         const { submittedBy, responseFields } = c.req.valid('json');

         const result = await db.response.create({
            data: {
               submittedBy,
               formId,
               responseFields: {
                  create: responseFields.map((responseField) => ({
                     fieldId: responseField.fieldId,
                     value: responseField.value,
                  })),
               },
            },
            include: {
               responseFields: true,
            },
         });

         return c.json({
            data: result,
         });
      },
   )
   .get('/:formId/responses', sessionMiddleware, async (c) => {
      const { formId } = c.req.param();

      const questions = await db.form.findFirst({
         where: {
            id: formId,
         },
         select: {
            fields: {
               select: {
                  id: true,
                  label: true,
               },
            },
         },
      });

      const result = await db.response.findMany({
         where: {
            formId,
         },
         select: {
            submittedBy: true,
            responseFields: {
               select: {
                  fieldId: true,
                  value: true,
               },
            },
         },
      });

      // Create a mapping of fieldId -> label from questions
      const fieldLabelMap = Object.fromEntries(
         questions!.fields.map((field: any) => [field.id, field.label]),
      );

      // Format responses to match the desired shape
      const formattedResponses = result.map((response: any) => {
         const mappedFields = Object.fromEntries(
            response.responseFields.map((el: any) => [
               fieldLabelMap[el.fieldId],
               el.value,
            ]),
         );
         return {
            submittedBy: response.submittedBy,
            ...mappedFields,
         };
      });

      return c.json({
         data: formattedResponses,
      });
   });
