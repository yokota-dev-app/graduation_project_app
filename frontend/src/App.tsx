import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopPage from './pages/top'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
