import { AppType } from '@/app/api/hono/[[...route]]/route';
import { hc } from 'hono/client';

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
