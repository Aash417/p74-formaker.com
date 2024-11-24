import 'server-only';

import { createMiddleware } from 'hono/factory';
import { auth } from './auth';
import db from './db';

type AdditionalContext = {
   Variables: {
      userId: string;
   };
};
export const sessionMiddleware = createMiddleware<AdditionalContext>(
   async (c, next) => {
      const session = await auth();
      if (!session?.user?.email) return;

      const user = await db.user.findUnique({
         where: {
            email: session.user.email,
         },
      });
      if (!user) return;

      c.set('userId', user.id);

      await next();
   },
);
