import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopPage from './pages/top'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
