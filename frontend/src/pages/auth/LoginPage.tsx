import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/api';
import { useAuth } from '../../features/auth/useAuth';

const AUTH_CARD =
  'w-full max-w-md rounded-2xl border border-solid border-[#eeecf3] bg-white p-6 shadow-[0_18px_55px_rgba(37,31,65,0.07)] sm:p-10 [&_h1]:m-0 [&_h1]:text-3xl [&_h1]:tracking-tight [&_h1]:text-[#20212a]';
const AUTH_FORM =
  'grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:text-sm [&_label]:font-bold [&_label]:text-[#393744] [&_input]:min-h-12 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-solid [&_input]:border-[#e4e2eb] [&_input]:bg-white [&_input]:px-3 [&_input]:py-0 [&_input]:text-[#20212a] [&_input]:outline-none [&_input]:focus:border-[#8675e3] [&_input]:focus:shadow-[0_0_0_3px_rgba(104,84,217,0.12)] [&_button]:mt-1 [&_button]:min-h-12 [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-[#6854d9] [&_button]:text-sm [&_button]:font-bold [&_button]:text-white [&_button:hover:not(:disabled)]:bg-[#5140bd] [&_button:disabled]:cursor-wait [&_button:disabled]:opacity-65';
const AUTH_PAGE = 'grid min-h-[65vh] place-items-center bg-[#faf9fc] px-5 pb-16 pt-12';
const AUTH_EYEBROW = 'mx-0 mb-2.5 mt-0 text-xs font-extrabold tracking-widest text-[#6854d9]';
const AUTH_DESC = 'mb-7 mt-2.5 text-sm leading-relaxed text-[#777583]';
const AUTH_ERROR = 'm-0 text-sm leading-relaxed text-[#b42318]';
const AUTH_SWITCH =
  'mb-0 mt-6 text-center text-sm text-[#777583] [&_a]:font-bold [&_a]:text-[#5a46c5]';

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
  const fields = [
    {
      label: 'メールアドレス',
      name: 'email',
      type: 'email',
      autoComplete: 'email',
      value: email,
      onChange: setEmail,
    },
    {
      label: 'パスワード',
      name: 'password',
      type: 'password',
      autoComplete: 'current-password',
      value: password,
      onChange: setPassword,
    },
  ];

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
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                type={field.type}
                name={field.name}
                autoComplete={field.autoComplete}
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                required
              />
            </label>
          ))}
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
