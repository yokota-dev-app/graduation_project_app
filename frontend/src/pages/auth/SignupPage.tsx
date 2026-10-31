import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../features/auth/api';
import { useAuth } from '../../features/auth/useAuth';

const AUTH_CARD =
  "w-[min(100%,460px)] rounded-[18px] border border-solid border-[#eeecf3] bg-white p-[38px] [box-shadow:0_18px_55px_rgba(37,31,65,0.07)] max-[520px]:px-[22px] max-[520px]:py-[28px] " +
  "[&_h1]:m-0 [&_h1]:text-[#20212a] [&_h1]:text-[28px] [&_h1]:tracking-[-0.04em]"
const AUTH_FORM =
  "grid gap-[17px] " +
  "[&_label]:grid [&_label]:gap-[7px] [&_label]:text-[#393744] [&_label]:text-[13px] [&_label]:font-bold " +
  "[&_input]:w-full [&_input]:min-h-[46px] [&_input]:px-[12px] [&_input]:py-0 [&_input]:border [&_input]:border-solid [&_input]:border-[#e4e2eb] [&_input]:rounded-[9px] [&_input]:[outline:none] [&_input]:text-[#20212a] [&_input]:bg-white " +
  "[&_input]:focus:border-[#8675e3] [&_input]:focus:[box-shadow:0_0_0_3px_rgba(104,84,217,0.12)] " +
  "[&_button]:min-h-[48px] [&_button]:mt-[3px] [&_button]:[border:0] [&_button]:rounded-[9px] [&_button]:text-white [&_button]:bg-[#6854d9] [&_button]:text-[14px] [&_button]:font-bold [&_button]:cursor-pointer " +
  "[&_button:hover:not(:disabled)]:bg-[#5140bd] [&_button:disabled]:cursor-wait [&_button:disabled]:opacity-[0.65]"
const AUTH_PAGE = "grid min-h-[65vh] place-items-center bg-[#faf9fc] px-[20px] pb-[72px] pt-[52px]"
const AUTH_EYEBROW = "mx-0 mb-[10px] mt-0 text-[#6854d9] text-[11px] font-extrabold tracking-[0.12em]"
const AUTH_DESC = "mx-0 mb-[26px] mt-[10px] text-[#777583] text-[14px] leading-[1.7]"
const AUTH_ERROR = "m-0 text-[#b42318] text-[13px] leading-[1.6]"
const AUTH_SWITCH = "mx-0 mb-0 mt-[23px] text-[#777583] text-[13px] text-center [&_a]:text-[#5a46c5] [&_a]:font-bold"

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
      navigate('/mypage', { replace: true });
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
    <main className={AUTH_PAGE}>
      <section className={AUTH_CARD} aria-labelledby="signup-title">
        <p className={AUTH_EYEBROW}>CREATE YOUR ACCOUNT</p>
        <h1 id="signup-title">新規登録</h1>
        <p className={AUTH_DESC}>アカウントを作成して、プロンプトを整理しましょう。</p>
        <form className={AUTH_FORM} onSubmit={handleSubmit}>
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
          {error && <p className={AUTH_ERROR} role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? '登録中...' : 'アカウントを作成'}
          </button>
        </form>
        <p className={AUTH_SWITCH}>
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </section>
    </main>
  );
}
