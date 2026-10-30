import { apiClient } from '../../shared/api/client';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
}

// ユーザー登録
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await apiClient.post('/signup', { user: data });
  return response.data;
};

// ログイン
export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await apiClient.post('/login', data);
  return response.data;
};

// ログアウト
export const logout = async () => {
  const response = await apiClient.delete('/logout');
  return response.data;
};

// ログイン状態の確認
export const checkLoggedIn = async (): Promise<{ logged_in: boolean; user?: User }> => {
  const response = await apiClient.get('/logged_in');
  return response.data;
};
