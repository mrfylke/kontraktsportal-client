import Link from 'next/link';
import styles from './header.module.css';
import { auth } from '@/modules/authentication';
import SignOutButton from '../sign-out';

export default async function Header() {
  const session = await auth();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Driftsportal</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.auth}>
        {session?.user && <p>Du er logget inn som {session.user.name}</p>}
        {session?.user && <SignOutButton />}
      </div>
    </header>
  );
}
