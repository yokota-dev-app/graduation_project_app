import { useNavigate } from 'react-router-dom';
import { createPrompt } from '../../features/prompts/api';
import PromptForm from './PromptForm';

export default function PromptCreatePage() {
  const navigate = useNavigate();

  return (
    <PromptForm
      heading="プロンプト作成"
      submitLabel="作成"
      submittingLabel="作成中..."
      errorFallback="プロンプトを作成できませんでした。"
      onSubmit={async (input) => {
        await createPrompt(input);
        navigate('/mypage');
      }}
      onCancel={() => navigate('/mypage')}
    />
  );
}
