import { Link } from 'react-router-dom';

interface DashboardPlaceholderProps {
  title: string;
}

export default function DashboardPlaceholder({ title }: DashboardPlaceholderProps) {
  return (
    <section className="grid min-h-[320px] content-center justify-items-center p-[32px] border border-dashed border-[#dedbe4] rounded-[13px] bg-[rgb(255_255_255/75%)] text-center [&_h1]:m-0 [&_h1]:text-[#28252f] [&_h1]:text-[26px] [&_a]:py-[9px] [&_a]:px-[14px] [&_a]:border [&_a]:border-solid [&_a]:border-[#e8e5ee] [&_a]:rounded-[8px] [&_a]:text-[#493b68] [&_a]:text-[12px] [&_a:hover]:bg-[#f3f0f8]">
      <p className="mt-0 mx-0 mb-[8px] text-[#7d6aab] text-[10px] font-[750] tracking-[0.12em]">WORKSPACE</p>
      <h1>{title}</h1>
      <p className="mt-[12px] mx-0 mb-[20px] text-[#85828c] text-[13px]">この機能は現在準備中です。</p>
      <Link to="/mypage">マイプロンプトに戻る</Link>
    </section>
  );
}
