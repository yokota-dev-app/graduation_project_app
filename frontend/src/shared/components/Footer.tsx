import styles from "./Footer.module.css";

function FooterView() {
  return(
    <footer className={styles.topFooter}>
      <small>© {new Date().getFullYear()} PromptShelf</small>
      <nav aria-label="フッターメニュー">
        <a href="/terms">利用規約</a>
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/contact">お問い合わせ</a>
      </nav>
    </footer>
  )
}

export default function Footer() {
  return (
    <FooterView />
  )
}