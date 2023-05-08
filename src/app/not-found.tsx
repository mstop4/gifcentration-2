import styles from '@/styles/layout/NotFound.module.scss';

export default function NotFound() {
  return (
    <div id={styles.notFound}>
      <h1 className={styles.mainTitle}>404 | Not Found</h1>
      <h2 className={styles.subtitle}>Could not find requested resource</h2>
    </div>
  );
}
