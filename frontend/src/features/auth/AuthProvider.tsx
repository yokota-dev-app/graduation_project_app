import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { checkLoggedIn, logout as apiLogout } from './api';
import type { User } from './api';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // アプリ起動時にCookieを使ってログイン状態をチェック
  useEffect(() => {
    checkLoggedIn()
      .then((res) => {
        if (res.logged_in) {
          setUser(res.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error('Failed to check auth status', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logoutUser = async () => {
    await apiLogout();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
