import { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getMyPrompts } from '../../features/prompts/api';
import PromptCard from '../../features/prompts/components/PromptCard';
import type { Prompt } from '../../features/prompts/types';

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
    <section className="text-[#28252f]" aria-labelledby="mypage-title">
      <div className="flex items-stretch justify-between gap-[18px] mb-[28px] max-[620px]:items-start [&_h1]:m-0 [&_h1]:text-[#28252f] [&_h1]:text-[clamp(25px,3vw,32px)] [&_h1]:font-[750] [&_h1]:tracking-[-0.04em]">
        <div>
          <p className="mt-0 mx-0 mb-[8px] text-[#7d6aab] text-[10px] font-[750] tracking-[0.12em]">YOUR WORKSPACE</p>
          <h1 id="mypage-title">マイプロンプト</h1>
        </div>
        <div className="flex flex-[0_0_auto] flex-col self-stretch justify-between items-end gap-[10px] min-h-[104px]">
          <Link className="inline-flex min-h-[42px] items-center justify-center gap-[8px] px-[16px] border border-solid border-[#34265b] rounded-[9px] bg-[#34265b] text-white text-[13px] font-[650] [transition:background_150ms_ease,transform_150ms_ease] hover:[transform:translateY(-1px)] hover:bg-[#463675] [&>span]:text-[18px] [&>span]:leading-none" to="/mypage/create">
            <span aria-hidden="true">＋</span>
            プロンプト作成
          </Link>
          {!loading && !error && (
            <span className="py-[7px] px-[11px] border border-solid border-[#e9e6ef] rounded-[20px] bg-white text-[#66616f] text-[11px] whitespace-nowrap">{filteredPrompts.length} 件</span>
          )}
        </div>
      </div>

      {loading && <p className="py-[36px] px-[20px] text-[#77747e] text-[13px] text-center" role="status">プロンプトを読み込み中...</p>}
      {error && <p className="py-[36px] px-[20px] text-[#b42318] text-[13px] text-center" role="alert">{error}</p>}
      {!loading && !error && filteredPrompts.length > 0 && (
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[18px] max-[1100px]:grid-cols-[repeat(2,minmax(0,1fr))] max-[620px]:grid-cols-[1fr] max-[620px]:gap-[13px]">
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
        <div className="grid min-h-[270px] content-center justify-items-center p-[30px] border border-dashed border-[#dedbe4] rounded-[13px] bg-[rgb(255_255_255/65%)] text-center [&>span]:grid [&>span]:w-[48px] [&>span]:h-[48px] [&>span]:place-items-center [&>span]:rounded-[50%] [&>span]:bg-[#f0edf5] [&>span]:text-[#6d5a91] [&>span]:text-[30px] [&_h2]:mt-[16px] [&_h2]:mx-0 [&_h2]:mb-[6px] [&_h2]:text-[#3a3741] [&_h2]:text-[15px] [&_p]:m-0 [&_p]:text-[#85828c] [&_p]:text-[12px]">
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
