import { formRoute } from '@/features/forms/server/route';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api/hono');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/forms', formRoute);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
