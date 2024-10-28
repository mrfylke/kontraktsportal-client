import { signIn } from '@/modules/authentication';
import styles from './page.module.css';
import { Button } from '@radix-ui/themes';

export default function SignInPage() {
  const handleSignIn = async () => {
    'use server';
    await signIn('microsoft-entra-id', { redirectTo: '/' });
  };
  return (
    <main className={styles.main}>
      <h2>Logg på kontraktsportal</h2>
      <p>Bruk din konto i FRAM for å logge inn på kontraktsportalen. </p>
      <form action={handleSignIn}>
        <Button type="submit" variant="solid">
          Logg på med FRAMkonto
        </Button>
      </form>
    </main>
  );
}
