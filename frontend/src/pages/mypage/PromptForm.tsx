import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { isAxiosError } from 'axios';
import type { CreatePromptInput } from '../../features/prompts/api';

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
    <form className="mx-auto grid w-full max-w-[1160px] gap-[16px]" onSubmit={handleSubmit}>
      <h1 className="m-0 text-[#28252f] text-[22px]">{heading}</h1>

      {errors.length > 0 && (
        <ul className="m-0 rounded-[8px] border border-solid border-[#f3c7c2] bg-[#fff3f1] py-[10px] pr-[14px] pl-[30px] text-[#b42318] text-[12px]" role="alert">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <label className="grid gap-[6px] text-[#45424d] text-[12px] font-bold [&_input]:rounded-[9px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:text-[#28252f] [&_input]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_input]:text-[13px] [&_input]:font-normal [&_input]:h-[42px] [&_input]:px-[12px] [&_input]:py-0 [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-solid [&_textarea]:border-[#b9b4c7] [&_textarea]:bg-white [&_textarea]:text-[#28252f] [&_textarea]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_textarea]:[font-family:inherit] [&_textarea]:text-[13px] [&_textarea]:font-normal [&_textarea]:leading-[1.7] [&_select]:rounded-[9px] [&_select]:border [&_select]:border-solid [&_select]:border-[#b9b4c7] [&_select]:bg-white [&_select]:text-[#28252f] [&_select]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_select]:[font-family:inherit] [&_select]:text-[13px] [&_select]:font-normal [&_select]:leading-[inherit] [&_select]:h-[42px] [&_select]:px-[12px] [&_select]:py-0 [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none] [&_textarea:focus]:border-[#5b46a0] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_textarea:focus]:[outline:none] [&_select:focus]:border-[#5b46a0] [&_select:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_select:focus]:[outline:none]">
        <span>タイトル</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={255} />
      </label>

      <label className="grid gap-[6px] text-[#45424d] text-[12px] font-bold [&_input]:rounded-[9px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:text-[#28252f] [&_input]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_input]:text-[13px] [&_input]:font-normal [&_input]:h-[42px] [&_input]:px-[12px] [&_input]:py-0 [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-solid [&_textarea]:border-[#b9b4c7] [&_textarea]:bg-white [&_textarea]:text-[#28252f] [&_textarea]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_textarea]:[font-family:inherit] [&_textarea]:text-[13px] [&_textarea]:font-normal [&_textarea]:leading-[1.7] [&_select]:rounded-[9px] [&_select]:border [&_select]:border-solid [&_select]:border-[#b9b4c7] [&_select]:bg-white [&_select]:text-[#28252f] [&_select]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_select]:[font-family:inherit] [&_select]:text-[13px] [&_select]:font-normal [&_select]:leading-[inherit] [&_select]:h-[42px] [&_select]:px-[12px] [&_select]:py-0 [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none] [&_textarea:focus]:border-[#5b46a0] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_textarea:focus]:[outline:none] [&_select:focus]:border-[#5b46a0] [&_select:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_select:focus]:[outline:none]">
        <span>説明</span>
        <textarea
          className="min-h-[84px] px-[12px] py-[12px] leading-[1.7] resize-y"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-[16px] max-[820px]:[grid-template-columns:1fr]">
        <div className="grid gap-[16px]">
          <label className="grid gap-[6px] text-[#45424d] text-[12px] font-bold [&_input]:rounded-[9px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:text-[#28252f] [&_input]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_input]:text-[13px] [&_input]:font-normal [&_input]:h-[42px] [&_input]:px-[12px] [&_input]:py-0 [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-solid [&_textarea]:border-[#b9b4c7] [&_textarea]:bg-white [&_textarea]:text-[#28252f] [&_textarea]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_textarea]:[font-family:inherit] [&_textarea]:text-[13px] [&_textarea]:font-normal [&_textarea]:leading-[1.7] [&_select]:rounded-[9px] [&_select]:border [&_select]:border-solid [&_select]:border-[#b9b4c7] [&_select]:bg-white [&_select]:text-[#28252f] [&_select]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_select]:[font-family:inherit] [&_select]:text-[13px] [&_select]:font-normal [&_select]:leading-[inherit] [&_select]:h-[42px] [&_select]:px-[12px] [&_select]:py-0 [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none] [&_textarea:focus]:border-[#5b46a0] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_textarea:focus]:[outline:none] [&_select:focus]:border-[#5b46a0] [&_select:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_select:focus]:[outline:none]">
            <span>プロンプト内容</span>
            <textarea
              className="min-h-[260px] p-[12px] leading-[1.7] resize-y"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="変数は {{変数名}} の形式で記述できます"
            />
          </label>
          <div className="grid gap-[6px] text-[#45424d] text-[12px] font-bold [&_input]:rounded-[9px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:text-[#28252f] [&_input]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_input]:text-[13px] [&_input]:font-normal [&_input]:h-[42px] [&_input]:px-[12px] [&_input]:py-0 [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-solid [&_textarea]:border-[#b9b4c7] [&_textarea]:bg-white [&_textarea]:text-[#28252f] [&_textarea]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_textarea]:[font-family:inherit] [&_textarea]:text-[13px] [&_textarea]:font-normal [&_textarea]:leading-[1.7] [&_select]:rounded-[9px] [&_select]:border [&_select]:border-solid [&_select]:border-[#b9b4c7] [&_select]:bg-white [&_select]:text-[#28252f] [&_select]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_select]:[font-family:inherit] [&_select]:text-[13px] [&_select]:font-normal [&_select]:leading-[inherit] [&_select]:h-[42px] [&_select]:px-[12px] [&_select]:py-0 [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none] [&_textarea:focus]:border-[#5b46a0] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_textarea:focus]:[outline:none] [&_select:focus]:border-[#5b46a0] [&_select:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_select:focus]:[outline:none]">
            <span>プレビュー</span>
            <div className="min-h-[120px] rounded-[9px] border border-solid border-[#b9b4c7] bg-[#f3f1f8] p-[12px] text-[#28252f] [box-shadow:0_1px_2px_rgb(36_28_55/8%)] [font-family:inherit] text-[13px] font-normal leading-[1.7] [overflow-wrap:anywhere] whitespace-pre-wrap" aria-live="polite">{preview}</div>
          </div>
        </div>

        <aside className="grid grid-rows-[auto_1fr] gap-[6px] text-[#45424d] text-[12px] font-bold">
          <span>変数</span>
          <div className="grid [align-content:start] gap-[12px] rounded-[9px] border border-solid border-[#b9b4c7] bg-[#f3f1f8] p-[12px] text-[#28252f] [box-shadow:0_1px_2px_rgb(36_28_55/8%)] [font-family:inherit] text-[13px] font-normal">
            {variables.length === 0 ? (
              <p className="m-0 text-[#a09da6] text-[11px] leading-[1.6]">{'{{変数名}}'} を入力すると、ここに表示されます。</p>
            ) : (
              variables.map((name) => (
                <label key={name} className="grid gap-[4px] [&_code]:text-[#493b68] [&_code]:text-[12px] [&_input]:h-[34px] [&_input]:rounded-[7px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:px-[10px] [&_input]:py-0 [&_input]:text-[12px] [&_input]:font-normal [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none]">
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

      <div className="flex items-end justify-between gap-[16px] [&_select]:min-w-[140px]">
        <label className="grid gap-[6px] text-[#45424d] text-[12px] font-bold [&_input]:rounded-[9px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:text-[#28252f] [&_input]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_input]:text-[13px] [&_input]:font-normal [&_input]:h-[42px] [&_input]:px-[12px] [&_input]:py-0 [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-solid [&_textarea]:border-[#b9b4c7] [&_textarea]:bg-white [&_textarea]:text-[#28252f] [&_textarea]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_textarea]:[font-family:inherit] [&_textarea]:text-[13px] [&_textarea]:font-normal [&_textarea]:leading-[1.7] [&_select]:rounded-[9px] [&_select]:border [&_select]:border-solid [&_select]:border-[#b9b4c7] [&_select]:bg-white [&_select]:text-[#28252f] [&_select]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_select]:[font-family:inherit] [&_select]:text-[13px] [&_select]:font-normal [&_select]:leading-[inherit] [&_select]:h-[42px] [&_select]:px-[12px] [&_select]:py-0 [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none] [&_textarea:focus]:border-[#5b46a0] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_textarea:focus]:[outline:none] [&_select:focus]:border-[#5b46a0] [&_select:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_select:focus]:[outline:none]">
          <span>公開設定</span>
          <select
            value={isPublic ? 'public' : 'private'}
            onChange={(event) => setIsPublic(event.target.value === 'public')}
          >
            <option value="private">非公開</option>
            <option value="public">公開</option>
          </select>
        </label>
        <div className="flex gap-[12px]">
          <button type="button" className="h-[42px] min-w-[96px] rounded-[8px] border-0 border-none border-[#45424d] bg-[#ececf0] text-[#45424d] text-[13px] cursor-pointer" onClick={onCancel}>
            キャンセル
          </button>
          <button type="submit" className="h-[42px] min-w-[96px] rounded-[8px] border-0 border-none border-white bg-[#292633] text-white text-[13px] enabled:hover:bg-[#3a3547] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer" disabled={submitting}>
            {submitting ? submittingLabel : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
