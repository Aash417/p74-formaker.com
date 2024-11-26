import Navbar from '@/components/navbar';
import Providers from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

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
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <Toaster />
            <Providers>
               <Navbar />
               <NuqsAdapter>{children}</NuqsAdapter>
            </Providers>
         </body>
      </html>
   );
}
