import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../features/auth/api';
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

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const fields = [
    {
      label: 'お名前',
      name: 'name',
      type: 'text',
      autoComplete: 'name',
      value: name,
      onChange: setName,
    },
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
      autoComplete: 'new-password',
      minLength: 6,
      value: password,
      onChange: setPassword,
    },
    {
      label: 'パスワード（確認）',
      name: 'password_confirmation',
      type: 'password',
      autoComplete: 'new-password',
      minLength: 6,
      value: passwordConfirmation,
      onChange: setPasswordConfirmation,
    },
  ];

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
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                type={field.type}
                name={field.name}
                autoComplete={field.autoComplete}
                minLength={field.minLength}
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                required
              />
            </label>
          ))}
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
