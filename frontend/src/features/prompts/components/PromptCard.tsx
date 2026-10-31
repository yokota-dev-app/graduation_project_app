import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prompt } from '../types';
import PromptActions from './PromptActions';

interface PromptCardProps {
  prompt: Prompt;
  onDeleted?: (id: number) => void;
}

export default function PromptCard({ prompt, onDeleted }: PromptCardProps) {
  const [copyError, setCopyError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const detailPath = `/mypage/prompts/${prompt.id}`;

  return (
    <article
      className={`relative flex min-w-0 flex-col rounded-[13px] border border-solid border-[#ecebf0] bg-white p-[20px] [box-shadow:0_3px_12px_rgb(36_28_55/3%)] [transition:box-shadow_160ms_ease,transform_160ms_ease] hover:[transform:translateY(-2px)] hover:[box-shadow:0_9px_24px_rgb(36_28_55/8%)] ${menuOpen ? 'z-[2]' : ''} cursor-pointer`}
      tabIndex={0}
      aria-label={`「${prompt.title}」の詳細を開く`}
      onClick={() => navigate(detailPath)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && event.key === 'Enter') navigate(detailPath);
      }}
    >
      <div className="flex items-start justify-between gap-[12px] [&_h2]:m-0 [&_h2]:overflow-hidden [&_h2]:text-[#26232d] [&_h2]:text-[16px] [&_h2]:font-bold [&_h2]:leading-[1.45] [&_h2]:text-ellipsis">
        <h2>{prompt.title}</h2>
        <PromptActions
          promptId={prompt.id}
          title={prompt.title}
          content={prompt.content}
          onMenuOpenChange={setMenuOpen}
          onCopyError={setCopyError}
          onDeleted={() => onDeleted?.(prompt.id)}
        />
      </div>
      <p className="my-[10px] mb-[18px] min-h-[40px] text-[#77747e] text-[12px] leading-[1.65]">{prompt.summary}</p>
      <div className="mb-[9px] flex items-baseline justify-between gap-[8px] [&_h3]:m-0 [&_h3]:text-[#45424d] [&_h3]:text-[12px] [&_h3]:font-bold [&_span]:text-[#a09da6] [&_span]:text-[10px]">
        <h3>プロンプト内容</h3>
        <span>{prompt.content.length} 文字</span>
      </div>
      <div className="min-h-[126px] cursor-auto rounded-[9px] border border-solid border-[#f0eef3] bg-[#faf9fc] p-[13px]" onClick={(event) => event.stopPropagation()}>
        <pre className="m-0 [display:-webkit-box] overflow-hidden text-ellipsis whitespace-pre-wrap text-[#65616c] [font-family:inherit] text-[14px] leading-[1.7] [overflow-wrap:anywhere] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] [line-clamp:5]">{prompt.content}</pre>
      </div>
      {copyError && <p className="mt-[8px] text-[#b42318] text-[11px]" role="alert">コピーできませんでした。</p>}
      <footer className="mt-auto flex justify-between gap-[8px] pt-[15px] text-[#87848e] text-[10px]">
        <span>{prompt.author}</span>
        <time dateTime={prompt.updatedAt.replaceAll('/', '-')}>更新日 {prompt.updatedAt}</time>
      </footer>
    </article>
  );
}
