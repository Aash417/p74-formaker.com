import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { test } from '@/features/forms/server/route';

export const runtime = 'edge';

const app = new Hono().basePath('/api/hono');

const routes = app.route('/test', test);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
