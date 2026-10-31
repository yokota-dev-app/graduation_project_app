import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/api';
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
    <main className={AUTH_PAGE}>
      <section className={AUTH_CARD} aria-labelledby="login-title">
        <p className={AUTH_EYEBROW}>WELCOME BACK</p>
        <h1 id="login-title">ログイン</h1>
        <p className={AUTH_DESC}>保存したプロンプトを使いましょう。</p>
        <form className={AUTH_FORM} onSubmit={handleSubmit}>
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
          {error && <p className={AUTH_ERROR} role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <p className={AUTH_SWITCH}>
          アカウントをお持ちでない方は <Link to="/signup">新規登録</Link>
        </p>
      </section>
    </main>
  );
}
