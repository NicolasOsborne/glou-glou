import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { CartProvider } from './features/CartContext'

import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductPage from './pages/Product'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import Error from './pages/Error'

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/category/:category' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
