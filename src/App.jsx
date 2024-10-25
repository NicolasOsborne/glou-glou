import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { useContext } from 'react'
import { CartProvider } from './features/CartContext'
import { LoginContext, LoginProvider } from './features/LoginContext'

import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductPage from './pages/Product'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import Error from './pages/Error'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

function AppRoutes() {
  const { isLoggedIn } = useContext(LoginContext)

  return (
    <Routes>
      <Route
        path='/'
        element={isLoggedIn ? <Home /> : <Navigate to='/login' />}
      />
      <Route path='/category/:category' element={<Home />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/confirmation' element={<Confirmation />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/:category' element={<Dashboard />} />
      <Route path='/dashboard/orders' element={<Dashboard />} />
      <Route path='/dashboard/users' element={<Dashboard />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

function App() {
  return (
    <LoginProvider>
      <CartProvider>
        <Router>
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </LoginProvider>
  )
}

export default App
