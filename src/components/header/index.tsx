import styles from './header.module.css';
import { auth } from '@/modules/authentication';
import SignOutButton from '../sign-out';

export default async function Header() {
  const session = await auth();
  return (
    <header className={styles.header}>
      {session?.user && (
        <>
          <p className={styles.userInfo}>
            Du er logget inn som {session.user.name}
          </p>
          <SignOutButton />
        </>
      )}
    </header>
  );
}
