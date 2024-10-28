import { signIn } from '@/modules/authentication';
import styles from './page.module.css';

export default function SignInPage() {
  const handleSignIn = async () => {
    'use server';
    await signIn('microsoft-entra-id', { redirectTo: '/' });
  };
  return (
    <main className={styles.main}>
      <h2>Logg på driftsportal</h2>
      <p>Bruk din konto i FRAM for å logge inn på driftsportalen. </p>
      <form action={handleSignIn}>
        <button type="submit">Logg på med FRAMkonto</button>
      </form>
    </main>
  );
}
