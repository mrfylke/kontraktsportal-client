'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale } from './config';

const LOCALE_COOKIE = 'locale';

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_COOKIE)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_COOKIE, locale);
}
