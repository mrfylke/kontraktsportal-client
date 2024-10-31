import { signOut } from '@/modules/authentication';
import styles from './sign-out.module.css';
import { Button } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

export default function SignOutButton() {
  const t = useTranslations('SignOutButton');
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/sign-in' });
      }}
      className={styles.signOutButton}
    >
      <Button type="submit" variant="outline">
        {t('label')}
      </Button>
    </form>
  );
}
