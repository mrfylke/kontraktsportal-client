import { signIn } from '@/modules/authentication';
import styles from './page.module.css';
import { Button } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

export default function SignInPage() {
  const t = useTranslations('SignInPage');

  const handleSignIn = async () => {
    'use server';
    await signIn('microsoft-entra-id', { redirectTo: '/' });
  };
  return (
    <main className={styles.main}>
      <h2>{t('title')}</h2>
      <p>{t('subtitle')}</p>
      <form action={handleSignIn}>
        <Button type="submit" variant="solid">
          {t('form.button')}
        </Button>
      </form>
    </main>
  );
}
