import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prompt } from '../types';
import PromptActions from './PromptActions';
import styles from './PromptCard.module.css';

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copyError, setCopyError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const detailPath = `/mypage/prompts/${prompt.id}`;

  return (
    <article
      className={`${styles.card} ${menuOpen ? styles.cardMenuOpen : ''}`}
      tabIndex={0}
      aria-label={`「${prompt.title}」の詳細を開く`}
      onClick={() => navigate(detailPath)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && event.key === 'Enter') navigate(detailPath);
      }}
    >
      <div className={styles.cardHeading}>
        <h2>{prompt.title}</h2>
        <PromptActions
          promptId={prompt.id}
          title={prompt.title}
          content={prompt.content}
          onMenuOpenChange={setMenuOpen}
          onCopyError={setCopyError}
        />
      </div>
      <p className={styles.summary}>{prompt.summary}</p>
      <div className={styles.contentHeading}>
        <h3>プロンプト内容</h3>
        <span>{prompt.content.length} 文字</span>
      </div>
      <div className={styles.promptContent} onClick={(event) => event.stopPropagation()}>
        <pre className={styles.promptText}>{prompt.content}</pre>
      </div>
      {copyError && <p className={styles.copyError} role="alert">コピーできませんでした。</p>}
      <footer className={styles.cardFooter}>
        <span>{prompt.author}</span>
        <time dateTime={prompt.updatedAt.replaceAll('/', '-')}>更新日 {prompt.updatedAt}</time>
      </footer>
    </article>
  );
}
