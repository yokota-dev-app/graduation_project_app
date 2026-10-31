import { Link } from 'react-router-dom';

interface DashboardPlaceholderProps {
  title: string;
}

export default function DashboardPlaceholder({ title }: DashboardPlaceholderProps) {
  return (
    <section className="grid min-h-80 content-center justify-items-center rounded-xl border border-dashed border-[#dedbe4] bg-[rgb(255_255_255/75%)] p-8 text-center [&_h1]:m-0 [&_h1]:text-2xl [&_h1]:text-[#28252f] [&_a]:rounded-lg [&_a]:border [&_a]:border-solid [&_a]:border-[#e8e5ee] [&_a]:px-3.5 [&_a]:py-2 [&_a]:text-xs [&_a]:text-[#493b68] [&_a:hover]:bg-[#f3f0f8]">
      <p className="mb-2 mt-0 text-xs font-bold tracking-widest text-[#7d6aab]">WORKSPACE</p>
      <h1>{title}</h1>
      <p className="mb-5 mt-3 text-sm text-[#85828c]">この機能は現在準備中です。</p>
      <Link to="/mypage">マイプロンプトに戻る</Link>
    </section>
  );
}
