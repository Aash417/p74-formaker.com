import { Hono } from 'hono';

export const test = new Hono().get('/', (c) => {
   return c.json({
      message: 'Hello Next.js!',
   });
});
