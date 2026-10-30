import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import styles from './DashboardLayout.module.css';

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
      navigate('/login');
    } catch {
      setLogoutError('ログアウトに失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <Link className={styles.brand} to="/" aria-label="PromptShelf ホーム">
          <span className={styles.brandMark} aria-hidden="true">P</span>
          <span>PromptShelf</span>
        </Link>

        <nav className={styles.primaryNav} aria-label="メインメニュー">
          <NavLink
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
            end
            to="/"
          >
            ⌂ <span>ホーム</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
            end
            to="/mypage"
          >
            ▤ <span>マイプロンプト</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
            to="/mypage/settings"
          >
            ⚙ <span>設定</span>
          </NavLink>
        </nav>

        <div className={styles.sidebarDivider} />
        <section className={styles.quickLinks} aria-labelledby="quick-links-heading">
          <h2 id="quick-links-heading">クイックリンク</h2>
          <a href="https://chatgpt.com/" target="_blank" rel="noreferrer">◉ <span>ChatGPT</span><span aria-hidden="true">↗</span></a>
          <a href="https://gemini.google.com/" target="_blank" rel="noreferrer">✦ <span>Gemini</span><span aria-hidden="true">↗</span></a>
          <a href="https://claude.ai/" target="_blank" rel="noreferrer">✳ <span>Claude</span><span aria-hidden="true">↗</span></a>
        </section>

        <div className={styles.sidebarBottom}>
          <span className={styles.avatar} aria-hidden="true">
            {user?.name?.slice(0, 1) ?? 'G'}
          </span>
          <span className={styles.accountName}>{user?.name ?? 'ゲストユーザー'}</span>
        </div>
      </aside>

      <div className={styles.mainColumn}>
        <header className={styles.topbar}>
          <form className={styles.searchForm} role="search" onSubmit={handleSearchSubmit}>
            <span aria-hidden="true">⌕</span>
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
            <button className={styles.logoutButton} type="button" onClick={handleLogout}>ログアウト</button>
          ) : (
            <Link className={styles.logoutButton} to="/login">ログイン</Link>
          )}
        </header>

        {logoutError && <p className={styles.logoutError} role="alert">{logoutError}</p>}
        <main className={styles.pageContent}>
          <Outlet context={searchQuery} />
        </main>
        <footer className={styles.footer}>
          <a href="/terms">利用規約</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/contact">お問い合わせ</a>
        </footer>
      </div>
    </div>
  );
}
