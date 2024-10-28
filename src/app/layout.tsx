import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Kontraksportal',
  description: 'Kontraksportal',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
