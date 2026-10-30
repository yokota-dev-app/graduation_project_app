import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import TopPage from './pages/top'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import DashboardLayout from './layouts/DashboardLayout'
import MyPage from './pages/mypage/MyPage'
import DashboardPlaceholder from './pages/mypage/DashboardPlaceholder'

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<TopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/mypage" element={<DashboardLayout />}>
        <Route index element={<MyPage />} />
        <Route path="create" element={<DashboardPlaceholder title="プロンプト作成" />} />
        <Route path="settings" element={<DashboardPlaceholder title="設定" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default App
