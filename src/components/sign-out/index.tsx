import { signOut } from '@/modules/authentication';
import styles from './sign-out.module.css';
import { Button } from '@radix-ui/themes';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/sign-in' });
      }}
      className={styles.signOutButton}
    >
      <Button type="submit" variant="outline">
        Logg ut
      </Button>
    </form>
  );
}
