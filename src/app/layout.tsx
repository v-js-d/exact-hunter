import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import InterceptorProvider from './providers/interceptor/InterceptorProvider';
import MswProvider from './providers/MswProvider';
import QueryProvider from './providers/QueryProvider';
import AuthProvider from './providers/router/AuthProvider';

import './styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ExactHunter',
  description:
    'ExactHunter - сервис, который помогает найти работу и подобрать персонал с упором на релевантность',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='en'>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <MswProvider>
        <QueryProvider>
          <InterceptorProvider>
            <AuthProvider>{children}</AuthProvider>
          </InterceptorProvider>
        </QueryProvider>
      </MswProvider>
    </body>
  </html>
);

export default RootLayout;
