import styles from "./Footer.module.css";

function FooterView() {
  return(
    <footer className={styles.topFooter}>
      <a className={`${styles.topBrand} ${styles.topFooterBrand}`} href="/">
        <span className={styles.topBrandMark} aria-hidden="true">
          <svg viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="11" /><path d="M13 13h14M13 20h14M13 27h8" /></svg>
        </span>
        <span>PromptShelf</span>
      </a>
      <p>プロンプトを、あなたの知識資産に。</p>
      <nav aria-label="フッターメニュー">
        <a href="/terms">利用規約</a>
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/contact">お問い合わせ</a>
      </nav>
      <small>© {new Date().getFullYear()} PromptShelf</small>
    </footer>
  )
}

export default function Footer() {
  return (
    <FooterView />
  )
}