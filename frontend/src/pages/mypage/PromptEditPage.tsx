import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPrompt, updatePrompt } from '../../features/prompts/api';
import type { PromptDetail } from '../../features/prompts/api';
import PromptForm from './PromptForm';

export default function PromptEditPage() {
  const { id = '' } = useParams();
  return <PromptEditor key={id} id={id} />;
}

function PromptEditor({ id }: { id: string }) {
  const navigate = useNavigate();
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
      <section>
        <p role="alert">{error}</p>
        <Link to="/mypage">マイプロンプトに戻る</Link>
      </section>
    );
  }

  if (!prompt) return <p role="status">読み込み中...</p>;

  const detailPath = `/mypage/prompts/${id}`;

  return (
    <PromptForm
      heading="プロンプト編集"
      submitLabel="保存"
      submittingLabel="保存中..."
      errorFallback="プロンプトを保存できませんでした。"
      initial={{
        title: prompt.title,
        description: prompt.summary,
        content: prompt.content,
        isPublic: prompt.isPublic,
        variableSettings: prompt.variableSettings,
      }}
      onSubmit={async (input) => {
        await updatePrompt(id, input);
        navigate(detailPath);
      }}
      onCancel={() => navigate(detailPath)}
    />
  );
}
