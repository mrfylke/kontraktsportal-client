import { signOut } from '@/modules/authentication';
import styles from './sign-out.module.css';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/sign-in' });
      }}
      className={styles.signOutButton}
    >
      <button type="submit">Logg ut</button>
    </form>
  );
}
