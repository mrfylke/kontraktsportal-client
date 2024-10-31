import styles from './header.module.css';
import { auth } from '@/modules/authentication';
import SignOutButton from '../sign-out';
import { getTranslations } from 'next-intl/server';

export default async function Header() {
  const t = await getTranslations('Header');
  const session = await auth();
  return (
    <header className={styles.header}>
      {session?.user && (
        <>
          <p className={styles.userInfo}>
            {t('userInfo', { name: session.user.name })}
          </p>
          <SignOutButton />
        </>
      )}
    </header>
  );
}
