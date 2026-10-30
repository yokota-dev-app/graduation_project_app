import { Link } from "react-router-dom";
import styles from "../../styles/top.module.css";

function TopView() {
  return (
    <div className={styles.topPage}>
      <main>
        <section className={styles.topHero} aria-labelledby="top-hero-title">
          <div className={styles.topHeroCopy}>
            <div className={styles.topEyebrow}>
              <span className={styles.topEyebrowDot} />
              プロンプトを、使い捨てにしない。
            </div>
            <h1 id="top-hero-title">
              いつもの仕事を、
              <br />
              <span>いつものプロンプト</span>で。
            </h1>
            <p className={styles.topHeroDescription}>
              お気に入りのプロンプトをひとつに整理。
              <br className={styles.desktopBreak} />
              変数や出力例と一緒に保存して、必要なときにすぐ使えます。
            </p>
            <div className={styles.topHeroActions}>
              <Link className={`${styles.topButton} ${styles.topButtonPrimary}`} to="/signup">
                無料で使い始める
                <span aria-hidden="true">→</span>
              </Link>
              <a className={styles.topTextLink} href="#features">
                機能を見る <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.topReassurance}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m4 10 4 4 8-9" />
              </svg>
              まずは、よく使うプロンプトを1つ登録するだけ。
            </p>
          </div>

          <div className={styles.topProductPreview} aria-label="プロンプト管理画面のイメージ">
            <img 
              src="/path/xxx.png" /* 画像のパス */
              alt="プロンプト管理画面のプレースホルダー画像" 
              className={styles.previewImage}
            />
          </div>
        </section>

        <section className={styles.topBenefits} aria-label="サービスの特徴">
          <div className={styles.topBenefit}>
            <span className={`${styles.topBenefitIcon} ${styles.benefitLavender}`}>⌕</span>
            <div><h2>すぐ見つかる</h2><p>検索とカテゴリーで、欲しいプロンプトにすばやくアクセス。</p></div>
          </div>
          <div className={styles.topBenefit}>
            <span className={`${styles.topBenefitIcon} ${styles.benefitMint}`}>↻</span>
            <div><h2>育てて、残せる</h2><p>変更を重ねたプロンプトも、バージョンごとに管理。</p></div>
          </div>
          <div className={styles.topBenefit}>
            <span className={`${styles.topBenefitIcon} ${styles.benefitPeach}`}>✳</span>
            <div><h2>すぐ使い回せる</h2><p>変数を入力して、用途に合うプロンプトをワンクリックでコピー。</p></div>
          </div>
        </section>

        <section className={styles.topFeatures} id="features" aria-labelledby="top-features-title">
          <div className={styles.topSectionHeading}>
            <span className={styles.topSectionKicker}>YOUR PROMPT WORKSPACE</span>
            <h2 id="top-features-title">プロンプト管理を、もっとシンプルに。</h2>
            <p>散らばったメモを探す毎日から、知識を積み上げる毎日へ。</p>
          </div>
          <div className={styles.topFeatureGrid}>
            <article className={styles.topFeatureCard}>
              <span className={styles.topFeatureNumber}>01</span>
              <div className={`${styles.topFeatureSymbol} ${styles.featureSymbolPurple}`}>⌕</div>
              <h3>まとめて管理・検索</h3>
              <p>メモ帳やチャットに散らばったプロンプトを、一か所に集約。名前やキーワードからすぐ見つけられます。</p>
            </article>
            <article className={styles.topFeatureCard}>
              <span className={styles.topFeatureNumber}>02</span>
              <div className={`${styles.topFeatureSymbol} ${styles.featureSymbolGreen}`}>⟲</div>
              <h3>変数をフォームで入力</h3>
              <p>名前や目的などの変数をフォームに入力するだけ。毎回プロンプトを書き直す手間を減らします。</p>
            </article>
            <article className={styles.topFeatureCard}>
              <span className={styles.topFeatureNumber}>03</span>
              <div className={`${styles.topFeatureSymbol} ${styles.featureSymbolOrange}`}>▤</div>
              <h3>プロンプトを育てる</h3>
              <p>更新したプロンプトを整理して保存。うまくいった形を、次の仕事でも再利用できます。</p>
            </article>
          </div>
        </section>

        <section className={styles.topCta}>
          <div className={styles.topCtaDecoration} aria-hidden="true">✳</div>
          <span className={styles.topSectionKicker}>LESS SEARCHING, MORE CREATING</span>
          <h2>探す時間を減らして、<br />いい仕事に集中しよう。</h2>
          <p>あなたのプロンプトを、頼れる仕事道具に。</p>
          <Link className={`${styles.topButton} ${styles.topButtonPrimary}`} to="/signup">無料で使い始める <span aria-hidden="true">→</span></Link>
        </section>
      </main>
    </div>
  );
}
export default function TopPage() {
  return (
    <TopView />
  );
}