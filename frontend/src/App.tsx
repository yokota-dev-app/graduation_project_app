import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import TopPage from './pages/top'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import DashboardLayout from './layouts/DashboardLayout'
import MyPage from './pages/mypage/MyPage'
import PromptCreatePage from './pages/mypage/PromptCreatePage'
import DashboardPlaceholder from './pages/mypage/DashboardPlaceholder'
import { useAuth } from './features/auth/useAuth'

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

function RequireAuth() {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <p role="status">ログイン状態を確認中...</p>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

function RedirectIfLoggedIn() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <p role="status">ログイン状態を確認中...</p>
  }

  if (isLoggedIn) {
    return <Navigate to="/mypage" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route element={<RedirectIfLoggedIn />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<TopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/mypage" element={<DashboardLayout />}>
          <Route index element={<MyPage />} />
          <Route path="create" element={<PromptCreatePage />} />
          <Route path="settings" element={<DashboardPlaceholder title="設定" />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default App
