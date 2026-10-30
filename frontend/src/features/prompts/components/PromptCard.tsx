import { useState } from 'react';
import type { Prompt } from '../types';
import styles from './PromptCard.module.css';

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(true);
      setCopied(false);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.cardHeading}>
        <h2>{prompt.title}</h2>
        <button
          className={styles.copyButton}
          type="button"
          onClick={copyPrompt}
          aria-label={`「${prompt.title}」のプロンプト内容をコピー`}
          title={copied ? 'コピーしました' : 'プロンプトをコピー'}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 12 4 4L19 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          )}
        </button>
      </div>
      <p className={styles.summary}>{prompt.summary}</p>
      <div className={styles.contentHeading}>
        <h3>プロンプト内容</h3>
        <span>{prompt.content.length} 文字</span>
      </div>
      <pre className={styles.promptContent}>{prompt.content}</pre>
      {copyError && <p className={styles.copyError} role="alert">コピーできませんでした。</p>}
      <footer className={styles.cardFooter}>
        <span>{prompt.author}</span>
        <time dateTime={prompt.updatedAt.replaceAll('/', '-')}>更新日 {prompt.updatedAt}</time>
      </footer>
    </article>
  );
}
