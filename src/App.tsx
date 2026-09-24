import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { CakeDetails } from './pages/CakeDetails'
import { Cakes } from './pages/Cakes'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { OrderConfirmation } from './pages/OrderConfirmation'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
export default function App() {
  return <><ScrollToTop /><Navbar /><Routes><Route path='/' element={<Home />} /><Route path='/cakes' element={<Cakes />} /><Route path='/cakes/:id' element={<CakeDetails />} /><Route path='/cart' element={<Cart />} /><Route path='/checkout' element={<Checkout />} /><Route path='/confirmation' element={<OrderConfirmation />} /><Route path='/about' element={<About />} /><Route path='/contact' element={<Contact />} /><Route path='*' element={<Navigate to='/' replace />} /></Routes><Footer /></>
}
