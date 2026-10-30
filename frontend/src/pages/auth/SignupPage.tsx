import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../features/auth/api';
import { useAuth } from '../../features/auth/useAuth';
import styles from './auth.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('パスワードと確認用パスワードが一致しません。');
      return;
    }

    setSubmitting(true);
    try {
      const response = await signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      loginUser(response.user);
      navigate('/', { replace: true });
    } catch (requestError: unknown) {
      if (axios.isAxiosError<{ errors?: string[] }>(requestError)) {
        const messages = requestError.response?.data?.errors;
        setError(messages?.join('、') || '登録に失敗しました。入力内容を確認してください。');
      } else {
        setError('登録に失敗しました。時間をおいて再度お試しください。');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard} aria-labelledby="signup-title">
        <p className={styles.authEyebrow}>CREATE YOUR ACCOUNT</p>
        <h1 id="signup-title">新規登録</h1>
        <p className={styles.authDescription}>アカウントを作成して、プロンプトを整理しましょう。</p>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label>
            お名前
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
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
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            パスワード（確認）
            <input
              type="password"
              name="password_confirmation"
              autoComplete="new-password"
              minLength={6}
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
          </label>
          {error && <p className={styles.authError} role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? '登録中...' : 'アカウントを作成'}
          </button>
        </form>
        <p className={styles.authSwitch}>
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </section>
    </main>
  );
}
