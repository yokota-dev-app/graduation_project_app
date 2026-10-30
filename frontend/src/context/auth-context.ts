import { createContext } from 'react';
import type { User } from '../api/auth';

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
