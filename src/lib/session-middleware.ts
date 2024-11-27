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
      if (!session?.user?.email)
         return c.body('Unauthorized req', 401, {
            'X-Message': 'Hello!',
            'Content-Type': 'text/plain',
         });

      const user = await db.user.findUnique({
         where: {
            email: session.user.email,
         },
      });
      if (!user)
         return c.body('user with this email not found', 404, {
            'X-Message': 'Hello!',
            'Content-Type': 'text/plain',
         });

      c.set('userId', user.id);

      await next();
   },
);
