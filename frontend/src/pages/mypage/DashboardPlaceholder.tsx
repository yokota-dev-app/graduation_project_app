import { Link } from 'react-router-dom';
import styles from './DashboardPlaceholder.module.css';

interface DashboardPlaceholderProps {
  title: string;
}

export default function DashboardPlaceholder({ title }: DashboardPlaceholderProps) {
  return (
    <section className={styles.placeholder}>
      <p className={styles.eyebrow}>WORKSPACE</p>
      <h1>{title}</h1>
      <p className={styles.message}>この機能は現在準備中です。</p>
      <Link to="/mypage">マイプロンプトに戻る</Link>
    </section>
  );
}
