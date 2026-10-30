import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/api';
import { useAuth } from '../../features/auth/useAuth';
import styles from './auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = (location.state as { from?: { pathname?: string } } | null)
    ?.from?.pathname ?? '/mypage';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await login({ email, password });
      loginUser(response.user);
      navigate(redirectPath, { replace: true });
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError) && requestError.response?.status === 401) {
        setError('メールアドレスまたはパスワードが正しくありません。');
      } else {
        setError('ログインに失敗しました。入力内容を確認して再度お試しください。');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="login-title">
        <p className={styles.authEyebrow}>WELCOME BACK</p>
        <h1 id="login-title">ログイン</h1>
        <p className={styles.authDescription}>保存したプロンプトを使いましょう。</p>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label>
            メールアドレス
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            パスワード
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className={styles.authError} role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <p className={styles.authSwitch}>
          アカウントをお持ちでない方は <Link to="/signup">新規登録</Link>
        </p>
      </section>
    </main>
  );
}
