import styles from './page.module.css';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <section className={styles.container}>
      <h1>{t('title')}</h1>
    </section>
  );
}
