import { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getMyPrompts } from '../../features/prompts/api';
import PromptCard from '../../features/prompts/components/PromptCard';
import type { Prompt } from '../../features/prompts/types';
import styles from './MyPage.module.css';

export default function MyPage() {
  const searchQuery = useOutletContext<string>();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getMyPrompts()
      .then((items) => {
        if (active) setPrompts(items);
      })
      .catch(() => {
        if (active) setError('プロンプトを読み込めませんでした。時間をおいて再度お試しください。');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredPrompts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!query) return prompts;

    return prompts.filter((prompt) =>
      `${prompt.title} ${prompt.summary} ${prompt.content}`.toLocaleLowerCase().includes(query),
    );
  }, [prompts, searchQuery]);

  return (
    <section className={styles.myPage} aria-labelledby="mypage-title">
      <div className={styles.pageHeading}>
        <div>
          <p className={styles.eyebrow}>YOUR WORKSPACE</p>
          <h1 id="mypage-title">マイプロンプト</h1>
        </div>
        <div className={styles.headingActions}>
          <Link className={styles.createPromptButton} to="/mypage/create">
            <span aria-hidden="true">＋</span>
            プロンプト作成
          </Link>
          {!loading && !error && (
            <span className={styles.promptCount}>{filteredPrompts.length} 件</span>
          )}
        </div>
      </div>

      {loading && <p className={styles.statusMessage} role="status">プロンプトを読み込み中...</p>}
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
      {!loading && !error && filteredPrompts.length > 0 && (
        <div className={styles.promptGrid}>
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onDeleted={(id) => setPrompts((items) => items.filter((item) => item.id !== id))}
            />
          ))}
        </div>
      )}
      {!loading && !error && filteredPrompts.length === 0 && (
        <div className={styles.emptyState}>
          <span aria-hidden="true">⌕</span>
          <h2>{prompts.length === 0 ? 'プロンプトはまだありません' : '該当するプロンプトがありません'}</h2>
          <p>
            {prompts.length === 0
              ? 'プロンプトを作成すると、ここに表示されます。'
              : '別のキーワードで検索してみてください。'}
          </p>
        </div>
      )}
    </section>
  );
}
