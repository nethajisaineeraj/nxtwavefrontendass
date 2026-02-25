import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import BidList from './components/BidList'
import BidDetail from './components/BidDetail'
import NotFound from './components/NotFound'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BidList />} />
        <Route path="/bid/:id" element={<BidDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}