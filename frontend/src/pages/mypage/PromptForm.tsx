import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { isAxiosError } from 'axios';
import type { CreatePromptInput } from '../../features/prompts/api';
import styles from './PromptCreatePage.module.css';

interface PromptFormProps {
  heading: string;
  submitLabel: string;
  submittingLabel: string;
  errorFallback: string;
  initial?: CreatePromptInput;
  onSubmit: (input: CreatePromptInput) => Promise<void>;
  onCancel: () => void;
}

const VARIABLE_PATTERN = /\{\{\s*([^{}\s]+)\s*\}\}/g;

function extractVariables(content: string): string[] {
  return [...new Set([...content.matchAll(VARIABLE_PATTERN)].map((match) => match[1]))];
}

function renderPreview(content: string, values: Record<string, string>): string {
  return content.replace(VARIABLE_PATTERN, (placeholder, name: string) => {
    const value = values[name];
    return value ? value : placeholder;
  });
}

export default function PromptForm({
  heading,
  submitLabel,
  submittingLabel,
  errorFallback,
  initial,
  onSubmit,
  onCancel,
}: PromptFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [isPublic, setIsPublic] = useState(initial?.isPublic ?? false);
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    initial?.variableSettings ?? {},
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const variables = useMemo(() => extractVariables(content), [content]);
  const preview = useMemo(() => renderPreview(content, variableValues), [content, variableValues]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors: string[] = [];
    if (!title.trim()) validationErrors.push('タイトルを入力してください。');
    if (!content.trim()) validationErrors.push('プロンプト内容を入力してください。');
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const variableSettings = Object.fromEntries(
      variables.map((name) => [name, variableValues[name] ?? '']),
    );

    setSubmitting(true);
    setErrors([]);
    try {
      await onSubmit({ title: title.trim(), description, content, isPublic, variableSettings });
    } catch (error) {
      const apiErrors = isAxiosError<{ errors?: string[] }>(error) ? error.response?.data?.errors : undefined;
      setErrors(apiErrors?.length ? apiErrors : [errorFallback]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>{heading}</h1>

      {errors.length > 0 && (
        <ul className={styles.errors} role="alert">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <label className={styles.field}>
        <span>タイトル</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={255} />
      </label>

      <label className={styles.field}>
        <span>説明</span>
        <textarea
          className={styles.description}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <div className={styles.editor}>
        <div className={styles.main}>
          <label className={styles.field}>
            <span>プロンプト内容</span>
            <textarea
              className={styles.content}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="変数は {{変数名}} の形式で記述できます"
            />
          </label>
          <div className={styles.field}>
            <span>プレビュー</span>
            <div className={styles.preview} aria-live="polite">{preview}</div>
          </div>
        </div>

        <aside className={styles.variables}>
          <span>変数</span>
          <div className={styles.variableList}>
            {variables.length === 0 ? (
              <p className={styles.hint}>{'{{変数名}}'} を入力すると、ここに表示されます。</p>
            ) : (
              variables.map((name) => (
                <label key={name} className={styles.variable}>
                  <code>{name}</code>
                  <input
                    value={variableValues[name] ?? ''}
                    onChange={(event) =>
                      setVariableValues((current) => ({ ...current, [name]: event.target.value }))
                    }
                    placeholder="初期値"
                  />
                </label>
              ))
            )}
          </div>
        </aside>
      </div>

      <div className={styles.footer}>
        <label className={styles.field}>
          <span>公開設定</span>
          <select
            value={isPublic ? 'public' : 'private'}
            onChange={(event) => setIsPublic(event.target.value === 'public')}
          >
            <option value="private">非公開</option>
            <option value="public">公開</option>
          </select>
        </label>
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            キャンセル
          </button>
          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? submittingLabel : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
