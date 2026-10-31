import { Link } from "react-router-dom";

const buttonClasses =
  "inline-flex items-center justify-center gap-[13px] rounded-[10px] border border-solid border-transparent text-[14px] font-bold [transition:transform_0.18s_ease,background_0.18s_ease,box-shadow_0.18s_ease] whitespace-nowrap hover:[transform:translateY(-1px)]";
const primaryButtonClasses =
  "text-white bg-(--top-purple) [box-shadow:0_8px_20px_rgba(104,84,217,0.2)] hover:bg-(--top-purple-dark) hover:[box-shadow:0_10px_24px_rgba(104,84,217,0.28)] focus:[outline-color:#005fcc]";

function TopView() {
  return (
    <div className="overflow-hidden bg-white">
      <main>
        <section
          className="relative mx-auto grid max-w-[1400px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(28px,5vw,78px)] px-[clamp(24px,6vw,92px)] pt-[92px] pb-[84px] max-[1000px]:gap-[24px] max-[1000px]:px-[32px] max-[1000px]:pt-[70px] max-[760px]:grid-cols-1 max-[760px]:gap-[36px] max-[760px]:px-[22px] max-[760px]:pt-[55px] max-[760px]:pb-[62px]"
          aria-labelledby="top-hero-title"
        >
          <div className="relative z-[1]">
            <div className="inline-flex items-center gap-[9px] rounded-[999px] border border-solid border-[#e9e4ff] bg-[#f8f6ff] px-[13px] py-[8px] text-[12px] font-bold text-[#6552c5]">
              <span className="h-[7px] w-[7px] rounded-[50%] bg-[#8d7be9] [box-shadow:0_0_0_4px_#e9e4ff]" />
              プロンプトを、使い捨てにしない。
            </div>
            <h1 className="[margin:26px_0_19px] text-[clamp(34px,4.15vw,59px)] leading-[1.42] tracking-[-0.065em] font-[800] max-[1000px]:text-[clamp(32px,4.4vw,46px)] max-[760px]:text-[clamp(36px,9vw,51px)]" id="top-hero-title">
              いつもの仕事を、
              <br />
              <span className="text-(--top-purple)">いつものプロンプト</span>で。
            </h1>
            <p className="m-0 text-[15px] leading-[2.05] text-[#777686] max-[760px]:text-[13px]">
              お気に入りのプロンプトをひとつに整理。
              <br />
              変数や出力例と一緒に保存して、必要なときにすぐ使えます。
            </p>
            <div className="mt-[30px] flex flex-wrap items-center gap-[24px] max-[420px]:gap-[17px]">
              <Link className={`${buttonClasses} ${primaryButtonClasses} min-h-[52px] px-[23px] max-[420px]:px-[17px]`} to="/signup">
                無料で使い始める
                <span aria-hidden="true">→</span>
              </Link>
              <a className="text-[13px] font-bold text-[#5e5a70]" href="#features">
                機能を見る <span className="pl-[5px] text-(--top-purple)" aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="mt-[19px] mb-0 flex items-center gap-[7px] text-[11px] text-[#8a8997]">
              <svg className="h-[15px] w-[15px] fill-none stroke-[#58a887] [stroke-width:2] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 20 20" aria-hidden="true">
                <path d="m4 10 4 4 8-9" />
              </svg>
              まずは、よく使うプロンプトを1つ登録するだけ。
            </p>
          </div>

          <div className="flex aspect-[16/9] w-full max-w-[600px] items-center justify-center overflow-hidden rounded-[8px] border-2 border-dashed border-[#d1d5db] bg-[#f3f4f6]" aria-label="プロンプト管理画面のイメージ">
            <img
              src="/path/xxx.png" /* 画像のパス */
              alt="プロンプト管理画面のプレースホルダー画像"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] grid-cols-[repeat(3,1fr)] gap-[26px] px-[clamp(24px,6vw,92px)] pb-[90px] max-[1000px]:gap-[12px] max-[1000px]:px-[32px] max-[760px]:grid-cols-1 max-[760px]:gap-[10px] max-[760px]:px-[22px] max-[760px]:pb-[65px]" aria-label="サービスの特徴">
          <div className="flex items-start gap-[15px] rounded-[13px] border border-solid border-[#efedf5] bg-white px-[18px] py-[22px] max-[1000px]:gap-[10px] max-[1000px]:px-[13px] max-[1000px]:py-[17px] max-[760px]:p-[17px]">
            <span className="grid h-[42px] flex-[0_0_42px] place-items-center rounded-[12px] bg-[#f0edff] text-[23px] font-medium text-[#6c58d7] max-[1000px]:h-[34px] max-[1000px]:flex-[0_0_34px]">⌕</span>
            <div><h2 className="mt-[1px] mb-[6px] text-[14px]">すぐ見つかる</h2><p className="m-0 text-[11px] leading-[1.8] text-[#858292]">検索とカテゴリーで、欲しいプロンプトにすばやくアクセス。</p></div>
          </div>
          <div className="flex items-start gap-[15px] rounded-[13px] border border-solid border-[#efedf5] bg-white px-[18px] py-[22px] max-[1000px]:gap-[10px] max-[1000px]:px-[13px] max-[1000px]:py-[17px] max-[760px]:p-[17px]">
            <span className="grid h-[42px] flex-[0_0_42px] place-items-center rounded-[12px] bg-[#e6f7ef] text-[23px] font-medium text-[#3e9b79] max-[1000px]:h-[34px] max-[1000px]:flex-[0_0_34px]">↻</span>
            <div><h2 className="mt-[1px] mb-[6px] text-[14px]">育てて、残せる</h2><p className="m-0 text-[11px] leading-[1.8] text-[#858292]">変更を重ねたプロンプトも、バージョンごとに管理。</p></div>
          </div>
          <div className="flex items-start gap-[15px] rounded-[13px] border border-solid border-[#efedf5] bg-white px-[18px] py-[22px] max-[1000px]:gap-[10px] max-[1000px]:px-[13px] max-[1000px]:py-[17px] max-[760px]:p-[17px]">
            <span className="grid h-[42px] flex-[0_0_42px] place-items-center rounded-[12px] bg-[#fff1e3] text-[23px] font-medium text-[#d28b4b] max-[1000px]:h-[34px] max-[1000px]:flex-[0_0_34px]">✳</span>
            <div><h2 className="mt-[1px] mb-[6px] text-[14px]">すぐ使い回せる</h2><p className="m-0 text-[11px] leading-[1.8] text-[#858292]">変数を入力して、用途に合うプロンプトをワンクリックでコピー。</p></div>
          </div>
        </section>

        <section className="bg-[#f9f8fc] px-[clamp(24px,6vw,92px)] pt-[84px] pb-[100px] max-[760px]:px-[22px] max-[760px]:pt-[64px] max-[760px]:pb-[68px]" id="features" aria-labelledby="top-features-title">
          <div className="mx-auto mb-[42px] max-w-[690px] text-center max-[760px]:mb-[28px]">
            <span className="text-[10px] font-[800] tracking-[0.16em] text-[#7564d7]">YOUR PROMPT WORKSPACE</span>
            <h2 className="mt-[13px] mb-[12px] text-[clamp(24px,3vw,34px)] leading-[1.5] tracking-[-0.05em]" id="top-features-title">プロンプト管理を、もっとシンプルに。</h2>
            <p className="m-0 text-[13px] leading-[1.9] text-[#838191]">散らばったメモを探す毎日から、知識を積み上げる毎日へ。</p>
          </div>
          <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(3,1fr)] gap-[18px] max-[760px]:grid-cols-1 max-[760px]:gap-[12px]">
            <article className="relative rounded-[15px] border border-solid border-[#eeecf4] bg-white p-[28px] max-[760px]:p-[23px]">
              <span className="absolute top-[25px] right-[25px] text-[11px] font-bold tracking-[0.08em] text-[#c5c1d4]">01</span>
              <div className="grid h-[48px] w-[48px] place-items-center rounded-[13px] bg-[#f0edff] text-[25px] text-[#6d59d9]">⌕</div>
              <h3 className="mt-[22px] mb-[10px] text-[16px] max-[760px]:mt-[16px]">まとめて管理・検索</h3>
              <p className="m-0 text-[12px] leading-[2] text-[#828090]">メモ帳やチャットに散らばったプロンプトを、一か所に集約。名前やキーワードからすぐ見つけられます。</p>
            </article>
            <article className="relative rounded-[15px] border border-solid border-[#eeecf4] bg-white p-[28px] max-[760px]:p-[23px]">
              <span className="absolute top-[25px] right-[25px] text-[11px] font-bold tracking-[0.08em] text-[#c5c1d4]">02</span>
              <div className="grid h-[48px] w-[48px] place-items-center rounded-[13px] bg-[#e7f7ef] text-[25px] text-[#369a75]">⟲</div>
              <h3 className="mt-[22px] mb-[10px] text-[16px] max-[760px]:mt-[16px]">変数をフォームで入力</h3>
              <p className="m-0 text-[12px] leading-[2] text-[#828090]">名前や目的などの変数をフォームに入力するだけ。毎回プロンプトを書き直す手間を減らします。</p>
            </article>
            <article className="relative rounded-[15px] border border-solid border-[#eeecf4] bg-white p-[28px] max-[760px]:p-[23px]">
              <span className="absolute top-[25px] right-[25px] text-[11px] font-bold tracking-[0.08em] text-[#c5c1d4]">03</span>
              <div className="grid h-[48px] w-[48px] place-items-center rounded-[13px] bg-[#fff1e4] text-[25px] text-[#d58b4b]">▤</div>
              <h3 className="mt-[22px] mb-[10px] text-[16px] max-[760px]:mt-[16px]">プロンプトを育てる</h3>
              <p className="m-0 text-[12px] leading-[2] text-[#828090]">更新したプロンプトを整理して保存。うまくいった形を、次の仕事でも再利用できます。</p>
            </article>
          </div>
        </section>

        <section className="relative mx-auto my-[80px] w-[calc(100%-48px)] max-w-[1180px] overflow-hidden rounded-[20px] bg-[linear-gradient(120deg,#f4f1ff,#faf8ff_55%,#f0f8f5)] px-[24px] py-[62px] text-center max-[760px]:my-[52px] max-[760px]:px-[20px] max-[760px]:py-[48px]">
          <div className="absolute top-[-35px] right-[9%] text-[150px] text-[rgba(126,107,222,0.12)]" aria-hidden="true">✳</div>
          <span className="text-[10px] font-[800] tracking-[0.16em] text-[#7564d7]">LESS SEARCHING, MORE CREATING</span>
          <h2 className="mt-[14px] mb-[12px] text-[clamp(27px,3vw,38px)] leading-[1.55] tracking-[-0.05em]">探す時間を減らして、<br />いい仕事に集中しよう。</h2>
          <p className="mt-0 mb-[25px] text-[13px] text-[#858292]">あなたのプロンプトを、頼れる仕事道具に。</p>
          <Link className={`${buttonClasses} ${primaryButtonClasses} min-h-[49px] px-[22px]`} to="/signup">無料で使い始める <span aria-hidden="true">→</span></Link>
        </section>
      </main>
    </div>
  );
}
export default function TopPage() {
  return <TopView />;
}
