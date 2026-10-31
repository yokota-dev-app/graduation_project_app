import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import Footer from '../shared/components/Footer';

const navLinkBase =
  'flex items-center gap-[11px] min-h-[42px] px-[12px] rounded-[8px] text-[14px] [&>span:first-child]:text-[18px] hover:text-[#302058] max-[760px]:justify-center max-[760px]:p-0 max-[760px]:text-[20px] max-[760px]:[&>span:last-child]:hidden';
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${navLinkBase} ${isActive ? 'bg-[#f0eef5] text-[#34265b] font-bold' : 'text-[#55535d]'}`;
const quickLink =
  '[&_a]:flex [&_a]:items-center [&_a]:gap-[10px] [&_a]:p-[10px] [&_a]:text-[#4c4a52] [&_a]:text-[13px] [&_a:hover]:text-[#302058] [&_a_span:nth-child(2)]:flex-1';
const logoutButton =
  'flex-[0_0_auto] min-h-[46px] py-0 px-[20px] border border-solid border-transparent rounded-[10px] bg-[#292633] hover:bg-[#3a3547] text-white cursor-pointer text-[14px] font-bold whitespace-nowrap max-[760px]:min-h-[38px] max-[760px]:px-[12px] max-[760px]:text-[12px]';

export default function DashboardLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [logoutError, setLogoutError] = useState('');
  const { user, isLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await logoutUser();
      navigate('/', { replace: true });
    } catch {
      setLogoutError('ログアウトに失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <div className={'flex h-screen overflow-hidden text-[#242328] bg-[#f8f8fa] [font-family:Inter,"Noto_Sans_JP",system-ui,sans-serif]'}>
      <aside className={'sticky top-0 flex flex-[0_0_248px] flex-col self-start h-screen overflow-y-auto pt-[28px] px-[18px] pb-[20px] border-r border-r-[#e9e8ec] [border-right-style:solid] bg-white max-[760px]:basis-[70px] max-[760px]:items-center max-[760px]:px-[8px] max-[760px]:py-[18px] max-[430px]:basis-[56px] max-[430px]:px-[5px]'}>
        <Link className={'flex items-center gap-[11px] mt-0 mr-0 mb-[34px] ml-[5px] text-[#20212a] [font-family:"DM_Sans","Noto_Sans_JP",sans-serif] text-[22px] font-extrabold tracking-[-0.7px] whitespace-nowrap max-[760px]:mx-0 max-[760px]:mb-[25px] max-[760px]:[&>span:last-child]:hidden'} to="/" aria-label="PromptShelf ホーム">
          <span className={'inline-flex w-[36px] h-[36px] flex-[0_0_36px] [&_svg]:w-full [&_svg]:h-full [&_rect]:[fill:#6854d9] [&_path]:[fill:none] [&_path]:[stroke:white] [&_path]:[stroke-width:2.4] [&_path]:[stroke-linecap:round]'} aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <rect x="3" y="3" width="34" height="34" rx="11" />
              <path d="M13 13h14M13 20h14M13 27h8" />
            </svg>
          </span>
          <span>PromptShelf</span>
        </Link>

        <nav className={'grid gap-[6px] mt-[24px] max-[760px]:w-full'} aria-label="メインメニュー">
          <NavLink
            className={navLinkClass}
            end
            to="/mypage"
          >
            ▤ <span>マイプロンプト</span>
          </NavLink>
          <NavLink
            className={navLinkClass}
            to="/mypage/settings"
          >
            ⚙ <span>設定</span>
          </NavLink>
        </nav>

        <div className={'h-px mt-[22px] mx-0 mb-[18px] bg-[#e9e8ec] max-[760px]:hidden'} />
        <section className={`${quickLink} max-[760px]:hidden [&_h2]:mt-0 [&_h2]:mr-0 [&_h2]:mb-[10px] [&_h2]:ml-[10px] [&_h2]:text-[#85838c] [&_h2]:text-[11px] [&_h2]:font-bold [&_h2]:tracking-[0.06em] [&_h2]:uppercase`} aria-labelledby="quick-links-heading">
          <h2 id="quick-links-heading">クイックリンク</h2>
          <a href="https://chatgpt.com/" target="_blank" rel="noreferrer">◉ <span>ChatGPT</span><span aria-hidden="true">↗</span></a>
          <a href="https://gemini.google.com/" target="_blank" rel="noreferrer">✦ <span>Gemini</span><span aria-hidden="true">↗</span></a>
          <a href="https://claude.ai/" target="_blank" rel="noreferrer">✳ <span>Claude</span><span aria-hidden="true">↗</span></a>
        </section>

        <div className={'flex items-center gap-[10px] mt-auto pt-[14px] px-[5px] pb-0 border-t border-t-[#e9e8ec] [border-top-style:solid] max-[760px]:px-0'}>
          <span className={'grid w-[34px] h-[34px] flex-[0_0_34px] place-items-center rounded-[50%] bg-[#eee9f8] text-[#39266a] text-[14px] font-bold'} aria-hidden="true">
            {user?.name?.slice(0, 1) ?? 'G'}
          </span>
          <span className={'overflow-hidden text-[#514f58] text-[12px] text-ellipsis whitespace-nowrap max-[760px]:hidden'}>{user?.name ?? 'ゲストユーザー'}</span>
        </div>
      </aside>

      <div className={'flex min-w-0 min-h-0 flex-1 flex-col'}>
        <header className={'sticky z-[1] top-0 flex min-h-[76px] items-center justify-between gap-[24px] py-[14px] px-[clamp(22px,4vw,56px)] border-b border-b-[#f0eff5] [border-bottom-style:solid] bg-[rgb(255_255_255/94%)] backdrop-blur-[12px] max-[760px]:min-h-[66px] max-[760px]:gap-[10px] max-[760px]:px-[14px]'}>
          <form className={'flex w-[min(100%,560px)] h-[46px] items-center gap-[10px] px-[13px] border border-solid border-[#e7e5ee] rounded-[11px] bg-[#faf9fc] text-[#7a7b89] max-[760px]:h-[43px] max-[430px]:gap-[6px] max-[430px]:px-[9px] [&>svg]:w-[21px] [&>svg]:h-[21px] [&>svg]:flex-[0_0_21px] [&>svg]:[fill:none] [&>svg]:[stroke:#7a7b89] [&>svg]:[stroke-width:1.8] [&>svg]:[stroke-linecap:round] [&_input]:w-full [&_input]:min-w-0 [&_input]:[border:0] [&_input]:[outline:0] [&_input]:bg-transparent [&_input]:text-[#242328] [&_input]:text-[14px] max-[430px]:[&_input]:text-[12px] [&_input]:placeholder:text-[#9999a6] [&_button]:[border:0] [&_button]:[background:none] [&_button]:text-[#77747e] [&_button]:cursor-pointer [&_button]:text-[20px]'} role="search" onSubmit={handleSearchSubmit}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              type="search"
              aria-label="プロンプトを検索"
              placeholder="タイトルや内容を検索..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} aria-label="検索をクリア">
                ×
              </button>
            )}
          </form>
          {isLoggedIn ? (
            <button className={logoutButton} type="button" onClick={handleLogout}>ログアウト</button>
          ) : (
            <Link className={logoutButton} to="/login">ログイン</Link>
          )}
        </header>

        {logoutError && <p className={'mt-[12px] mx-[clamp(22px,4vw,56px)] mb-0 text-[#b42318] text-[13px]'} role="alert">{logoutError}</p>}
        <div className={'min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable]'}>
          <main className={'w-full max-w-[1500px] flex-1 my-0 mx-auto pt-[38px] px-[clamp(22px,4vw,56px)] pb-[56px] max-[760px]:pt-[28px] max-[760px]:px-[18px] max-[760px]:pb-[40px]'}>
            <Outlet context={searchQuery} />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
