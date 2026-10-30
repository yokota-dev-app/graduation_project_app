import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';
import styles from "./Header.module.css";

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
      <header className={styles.topHeader}>
        <Link className={styles.topBrand} to="/" aria-label="PromptShelf ホーム">
          <span className={styles.topBrandMark} aria-hidden="true">
            <svg viewBox="0 0 40 40" role="img">
              <rect x="3" y="3" width="34" height="34" rx="11" />
              <path d="M13 13h14M13 20h14M13 27h8" />
            </svg>
          </span>
          <span>PromptShelf</span>
        </Link>

        <form className={styles.topSearch} role="search" onSubmit={handleSearchSubmit}>
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

        <nav className={styles.topHeaderActions} aria-label="アカウントメニュー">
          {!loading && (isLoggedIn ? (
            <>
              <span className={styles.accountName}>{user?.name} さん</span>
              <button className={`${styles.topButton} ${styles.topButtonDark}`} type="button" onClick={handleLogout}>
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link className={`${styles.topButton} ${styles.topButtonQuiet}`} to="/signup">新規登録</Link>
              <Link className={`${styles.topButton} ${styles.topButtonDark}`} to="/login">ログイン</Link>
            </>
          ))}
        </nav>
      </header>
      {logoutError && <p className={styles.logoutError} role="alert">{logoutError}</p>}
    </>
  );
}