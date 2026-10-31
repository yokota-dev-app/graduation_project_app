const FOOTER =
  "grid h-[56px] shrink-0 grid-cols-[1fr_auto] items-center gap-x-[24px] gap-y-[6px] [border-top:1px_solid_#efedf5] bg-white px-[clamp(24px,6vw,92px)] text-[12px] " +
  "max-[760px]:h-[72px] max-[760px]:grid-cols-[1fr] max-[760px]:gap-[7px] max-[760px]:px-[22px]"
const NAV =
  "col-start-2 row-start-1 flex flex-wrap gap-[20px] text-[#777485] max-[760px]:col-start-1 max-[760px]:row-start-2 max-[760px]:mt-[3px] max-[760px]:gap-[16px]"

function FooterView() {
  return(
    <footer className={FOOTER}>
      <small className="col-start-1 row-start-1 text-[length:inherit] text-[#8d8a98]">© {new Date().getFullYear()} PromptShelf</small>
      <nav className={NAV} aria-label="フッターメニュー">
        <a className="hover:text-(--top-purple)" href="/terms">利用規約</a>
        <a className="hover:text-(--top-purple)" href="/privacy">プライバシーポリシー</a>
        <a className="hover:text-(--top-purple)" href="/contact">お問い合わせ</a>
      </nav>
    </footer>
  )
}

export default function Footer() {
  return (
    <FooterView />
  )
}