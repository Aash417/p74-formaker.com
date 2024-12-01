import Providers from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Formaker',
   description: 'Generated your own forms',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={cn(inter.className, 'min-h-screen antialiased')}>
            <Toaster />
            <Providers>
               <SessionProvider>
                  {children}
                  <Analytics />
               </SessionProvider>
            </Providers>
         </body>
      </html>
   );
}
