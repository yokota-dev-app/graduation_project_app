import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPrompt } from '../../features/prompts/api';
import type { PromptDetail } from '../../features/prompts/api';
import PromptActions from '../../features/prompts/components/PromptActions';

const VARIABLE_SPLIT_PATTERN = /\{\{\s*([^{}\s]+)\s*\}\}/;

function extractVariables(content: string): string[] {
  return [...new Set(content.split(VARIABLE_SPLIT_PATTERN).filter((_, index) => index % 2 === 1))];
}

export default function PromptDetailPage() {
  const { id = '' } = useParams();
  return <PromptDetail key={id} id={id} />;
}

function PromptDetail({ id }: { id: string }) {
  const navigate = useNavigate();
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
      <section className="mx-auto grid w-full max-w-[860px] gap-[12px] text-[#28252f] [&_h1]:m-0 [&_h1]:text-[24px] [&_h2]:mt-[8px] [&_h2]:mb-0 [&_h2]:text-[#45424d] [&_h2]:text-[13px]">
        <p className="m-0 text-[#b42318] text-[13px]" role="alert">{error}</p>
        <Link className="text-[#493b68] text-[12px] no-underline" to="/mypage">マイプロンプトに戻る</Link>
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
    <section className="mx-auto grid w-full max-w-[860px] gap-[12px] text-[#28252f] [&_h1]:m-0 [&_h1]:text-[24px] [&_h2]:mt-[8px] [&_h2]:mb-0 [&_h2]:text-[#45424d] [&_h2]:text-[13px]">
      <Link className="text-[#493b68] text-[12px] no-underline" to="/mypage">← マイプロンプトに戻る</Link>
      <div className="flex items-center justify-between gap-[12px]">
        <h1>{prompt.title}</h1>
        <PromptActions
          promptId={prompt.id}
          title={prompt.title}
          content={showRaw ? prompt.content : appliedContent}
          onCopyError={setCopyFailed}
          onDeleted={() => navigate('/mypage')}
        />
      </div>
      {copyFailed && <p className="m-0 text-[#b42318] text-[13px]" role="alert">コピーできませんでした。</p>}
      <p className="m-0 text-[#85828c] text-[12px]">
        {prompt.isPublic ? '公開' : '非公開'} ・ {prompt.author} ・ 更新日 {prompt.updatedAt}
      </p>
      {prompt.summary && <p className="m-0 text-[14px] leading-[1.7]">{prompt.summary}</p>}

      <div className="flex items-center justify-between gap-[12px]">
        <h2>{showRaw ? 'プロンプト原文' : 'プロンプト内容（変数適用後）'}</h2>
        <button
          type="button"
          className="h-[30px] rounded-[8px] border border-solid border-[#b9b4c7] bg-white px-[12px] py-0 text-[#493b68] text-[12px] [font-family:inherit] cursor-pointer aria-pressed:bg-[#292633] aria-pressed:text-white"
          aria-pressed={showRaw}
          onClick={() => setShowRaw((value) => !value)}
        >
          原文表示 {showRaw ? 'ON' : 'OFF'}
        </button>
      </div>
      <pre className="m-0 whitespace-pre-wrap rounded-[9px] border border-solid border-[#b9b4c7] bg-[#f3f1f8] p-[16px] text-[#28252f] [font-family:inherit] text-[13px] leading-[1.8] [overflow-wrap:anywhere]">
        {showRaw
          ? prompt.content
          : parts.map((part, index) =>
              index % 2 === 1 ? (
                <strong key={index} className="relative cursor-default text-[#5b46a0] font-bold hover:after:absolute hover:after:bottom-[calc(100%+4px)] hover:after:left-0 hover:after:z-[1] hover:after:whitespace-nowrap hover:after:rounded-[6px] hover:after:bg-[#292633] hover:after:px-[8px] hover:after:py-[3px] hover:after:text-[11px] hover:after:font-normal hover:after:leading-[1.4] hover:after:text-white hover:after:content-[attr(data-name)] hover:after:pointer-events-none" data-name={part}>
                  {valueOf(part) || `{{${part}}}`}
                </strong>
              ) : (
                part
              ),
            )}
      </pre>

      <h2>変数設定</h2>
      {variableNames.length === 0 ? (
        <p className="m-0 text-[#85828c] text-[12px]">このプロンプトに変数はありません。</p>
      ) : (
        <div className="grid gap-[10px]">
          {variableNames.map((name) => (
            <label key={name} className="grid grid-cols-[160px_minmax(0,1fr)] items-center gap-[12px] [&_code]:text-[#493b68] [&_code]:text-[14px] [&_input]:h-[38px] [&_input]:rounded-[8px] [&_input]:border [&_input]:border-solid [&_input]:border-[#b9b4c7] [&_input]:bg-white [&_input]:px-[12px] [&_input]:py-0 [&_input]:text-[#28252f] [&_input]:[font-family:inherit] [&_input]:text-[13px] [&_input]:[box-shadow:0_1px_2px_rgb(36_28_55/8%)] [&_input:focus]:border-[#5b46a0] [&_input:focus]:[box-shadow:0_0_0_3px_rgb(91_70_160/18%)] [&_input:focus]:[outline:none]">
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
