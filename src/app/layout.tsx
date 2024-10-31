import type { Metadata } from 'next';
import './globals.css';
import '@radix-ui/themes/styles.css';
import Header from '@/components/header';
import { Theme } from '@radix-ui/themes';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Kontraksportal',
  description: 'Kontraksportal',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Theme>
            <Header />
            <main>{children}</main>
          </Theme>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
