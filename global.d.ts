import no from './src/modules/i18n/translations/no.json';

type Messages = typeof no;

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}
