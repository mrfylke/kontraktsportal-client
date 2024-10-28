import type { Metadata } from 'next';
import './globals.css';
import '@radix-ui/themes/styles.css';
import Header from '@/components/header';
import { Theme } from '@radix-ui/themes';

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
        <Theme>
          <Header />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
