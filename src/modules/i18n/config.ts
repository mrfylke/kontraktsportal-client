export const locales = ['no'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'no';
