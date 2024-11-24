import { formRoute } from '@/features/forms/server/route';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api/hono');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/forms', formRoute);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
