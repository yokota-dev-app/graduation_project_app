import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPrompt } from '../../features/prompts/api';
import type { PromptDetail } from '../../features/prompts/api';
import PromptActions from '../../features/prompts/components/PromptActions';
import styles from './PromptDetailPage.module.css';

const VARIABLE_SPLIT_PATTERN = /\{\{\s*([^{}\s]+)\s*\}\}/;

function extractVariables(content: string): string[] {
  return [...new Set(content.split(VARIABLE_SPLIT_PATTERN).filter((_, index) => index % 2 === 1))];
}

export default function PromptDetailPage() {
  const { id = '' } = useParams();
  return <PromptDetail key={id} id={id} />;
}

function PromptDetail({ id }: { id: string }) {
  const [showRaw, setShowRaw] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [inputs, setInputs] = useState<Record<string, string>>({});
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

  const variableNames = extractVariables(prompt.content);
  const valueOf = (name: string) => inputs[name] ?? prompt.variableSettings[name] ?? '';
  const parts = prompt.content.split(VARIABLE_SPLIT_PATTERN);
  const appliedContent = parts
    .map((part, index) => (index % 2 === 1 ? valueOf(part) || `{{${part}}}` : part))
    .join('');

  return (
    <section className={styles.page}>
      <Link className={styles.back} to="/mypage">← マイプロンプトに戻る</Link>
      <div className={styles.titleRow}>
        <h1>{prompt.title}</h1>
        <PromptActions
          title={prompt.title}
          content={showRaw ? prompt.content : appliedContent}
          onCopyError={setCopyFailed}
        />
      </div>
      {copyFailed && <p className={styles.error} role="alert">コピーできませんでした。</p>}
      <p className={styles.meta}>
        {prompt.isPublic ? '公開' : '非公開'} ・ {prompt.author} ・ 更新日 {prompt.updatedAt}
      </p>
      {prompt.summary && <p className={styles.summary}>{prompt.summary}</p>}

      <div className={styles.contentHeading}>
        <h2>{showRaw ? 'プロンプト原文' : 'プロンプト内容（変数適用後）'}</h2>
        <button
          type="button"
          className={styles.rawToggle}
          aria-pressed={showRaw}
          onClick={() => setShowRaw((value) => !value)}
        >
          原文表示 {showRaw ? 'ON' : 'OFF'}
        </button>
      </div>
      <pre className={styles.content}>
        {showRaw
          ? prompt.content
          : parts.map((part, index) =>
              index % 2 === 1 ? (
                <strong key={index} className={styles.variableValue} data-name={part}>
                  {valueOf(part) || `{{${part}}}`}
                </strong>
              ) : (
                part
              ),
            )}
      </pre>

      <h2>変数設定</h2>
      {variableNames.length === 0 ? (
        <p className={styles.meta}>このプロンプトに変数はありません。</p>
      ) : (
        <div className={styles.variables}>
          {variableNames.map((name) => (
            <label key={name} className={styles.variable}>
              <code>{name}</code>
              <input
                value={valueOf(name)}
                onChange={(event) => setInputs((current) => ({ ...current, [name]: event.target.value }))}
                placeholder="値を入力"
              />
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
