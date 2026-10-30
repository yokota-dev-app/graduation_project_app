import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from "./Header.module.css";

type HeaderProps = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function HeaderView({
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
}: HeaderProps) {
  return (
    <header className={styles.topHeader}>
      <a className={styles.topBrand} href="/" aria-label="PromptShelf ホーム">
        <span className={styles.topBrandMark} aria-hidden="true">
          <svg viewBox="0 0 40 40" role="img">
            <rect x="3" y="3" width="34" height="34" rx="11" />
            <path d="M13 13h14M13 20h14M13 27h8" />
          </svg>
        </span>
        <span>PromptShelf</span>
      </a>

      <form className={styles.topSearch} role="search" onSubmit={onSearchSubmit}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          aria-label="プロンプトを検索"
          type="search"
          placeholder="プロンプトを検索..."
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
        <button type="submit" aria-label="検索する">
          検索
        </button>
      </form>

      <nav className={styles.topHeaderActions} aria-label="アカウントメニュー">
        <a className={`${styles.topButton} ${styles.topButtonQuiet}`} href="/signup">
          新規登録
        </a>
        <a className={`${styles.topButton} ${styles.topButtonDark}`} href="/login">
          ログイン
        </a>
      </nav>
    </header>
  )
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // MVP: route to your prompt list/search page. Adjust the URL to match your router.
    window.location.href = `/prompts?query=${encodeURIComponent(query)}`;
  };

  return (
    <HeaderView
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      onSearchSubmit={handleSearchSubmit}
    />
  );
}