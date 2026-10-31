import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';

const HEADER =
  "flex h-[88px] items-center justify-between gap-[28px] [border-bottom:1px_solid_#f0eff5] bg-[rgb(255_255_255/0.94)] px-[clamp(24px,6vw,92px)] " +
  "max-[1000px]:gap-[16px] max-[1000px]:px-[28px] " +
  "max-[760px]:h-auto max-[760px]:min-h-[72px] max-[760px]:flex-wrap max-[760px]:px-[20px] max-[760px]:py-[14px]"
const BRAND =
  "inline-flex items-center gap-[11px] whitespace-nowrap text-[22px] font-extrabold tracking-[-0.7px] max-[760px]:text-[19px]"
const BRAND_MARK =
  "inline-flex h-[36px] w-[36px] max-[760px]:h-[31px] max-[760px]:w-[31px] " +
  "[&_svg]:h-full [&_svg]:w-full [&_rect]:[fill:var(--top-purple)] " +
  "[&_path]:[fill:none] [&_path]:[stroke:white] [&_path]:[stroke-width:2.4] [&_path]:[stroke-linecap:round]"
const SEARCH =
  "flex h-[46px] w-[min(560px,42vw)] items-center gap-[10px] rounded-[11px] border border-solid border-[#e7e5ee] bg-[#faf9fc] px-[13px] " +
  "max-[1000px]:w-[min(300px,30vw)] max-[760px]:order-3 max-[760px]:h-[43px] max-[760px]:w-full " +
  "[&>svg]:h-[21px] [&>svg]:w-[21px] [&>svg]:flex-[0_0_21px] [&>svg]:[fill:none] [&>svg]:[stroke:#7a7b89] [&>svg]:[stroke-width:1.8] [&>svg]:[stroke-linecap:round] " +
  "[&_input]:w-full [&_input]:min-w-0 [&_input]:[border:0] [&_input]:[outline:0] [&_input]:bg-transparent [&_input]:text-(--top-ink) [&_input]:text-[14px] [&_input]:placeholder:text-[#9999a6]"
const ACTIONS =
  "flex items-center gap-[10px] max-[760px]:ml-auto max-[760px]:gap-[7px]"
const BUTTON =
  "inline-flex min-h-[46px] items-center justify-center gap-[13px] whitespace-nowrap rounded-[10px] border border-solid px-[20px] text-[14px] font-bold " +
  "[transition:transform_0.18s_ease,background_0.18s_ease,box-shadow_0.18s_ease] hover:[transform:translateY(-1px)] " +
  "max-[760px]:min-h-[38px] max-[760px]:px-[12px] max-[760px]:text-[12px]"
const BUTTON_QUIET =
  `${BUTTON} border-[#e8e6ef] bg-white text-[#4c4a5b] hover:bg-[#f8f7fc] max-[420px]:hidden`
const BUTTON_DARK =
  `${BUTTON} border-transparent bg-[#292633] text-white hover:bg-[#3a3547]`

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutError, setLogoutError] = useState('');
  const { user, isLoggedIn, loading, logoutUser } = useAuth();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // MVP: route to your prompt list/search page. Adjust the URL to match your router.
    window.location.href = `/prompts?query=${encodeURIComponent(query)}`;
  };

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await logoutUser();
    } catch {
      setLogoutError('ログアウトに失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <>
      <header className={HEADER}>
        <Link className={BRAND} to="/" aria-label="PromptShelf ホーム">
          <span className={BRAND_MARK} aria-hidden="true">
            <svg viewBox="0 0 40 40" role="img">
              <rect x="3" y="3" width="34" height="34" rx="11" />
              <path d="M13 13h14M13 20h14M13 27h8" />
            </svg>
          </span>
          <span>PromptShelf</span>
        </Link>

        <form className={SEARCH} role="search" onSubmit={handleSearchSubmit}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            aria-label="プロンプトを検索"
            type="search"
            placeholder="プロンプトを検索..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>

        <nav className={ACTIONS} aria-label="アカウントメニュー">
          {!loading && (isLoggedIn ? (
            <>
              <span className={"whitespace-nowrap text-[13px] font-bold text-[#4c4a5b]"}>{user?.name} さん</span>
              <button className={BUTTON_DARK} type="button" onClick={handleLogout}>
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link className={BUTTON_QUIET} to="/signup">新規登録</Link>
              <Link className={BUTTON_DARK} to="/login">ログイン</Link>
            </>
          ))}
        </nav>
      </header>
      {logoutError && <p className={"m-0 bg-[#fff5f4] px-[20px] py-[8px] text-center text-[13px] text-[#b42318]"} role="alert">{logoutError}</p>}
    </>
  );
}