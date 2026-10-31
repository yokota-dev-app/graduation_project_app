import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPrompt } from '../../features/prompts/api';
import type { PromptDetail } from '../../features/prompts/api';
import styles from './PromptDetailPage.module.css';

export default function PromptDetailPage() {
  const { id = '' } = useParams();
  const [prompt, setPrompt] = useState<PromptDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getPrompt(id)
      .then((item) => {
        if (active) setPrompt(item);
      })
      .catch(() => {
        if (active) setError('プロンプトを読み込めませんでした。');
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <section className={styles.page}>
        <p className={styles.error} role="alert">{error}</p>
        <Link className={styles.back} to="/mypage">マイプロンプトに戻る</Link>
      </section>
    );
  }

  if (!prompt || String(prompt.id) !== id) return <p role="status">読み込み中...</p>;

  const variables = Object.entries(prompt.variableSettings);

  return (
    <section className={styles.page}>
      <Link className={styles.back} to="/mypage">← マイプロンプトに戻る</Link>
      <h1>{prompt.title}</h1>
      <p className={styles.meta}>
        {prompt.isPublic ? '公開' : '非公開'} ・ {prompt.author} ・ 更新日 {prompt.updatedAt}
      </p>
      {prompt.summary && <p className={styles.summary}>{prompt.summary}</p>}

      <h2>プロンプト内容</h2>
      <pre className={styles.content}>{prompt.content}</pre>

      {variables.length > 0 && (
        <>
          <h2>変数</h2>
          <ul className={styles.variables}>
            {variables.map(([name, value]) => (
              <li key={name}>
                <code>{name}</code>
                <span>{value || '（初期値なし）'}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
