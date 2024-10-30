import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { CartProvider } from './features/CartContext'
import { LoginProvider } from './features/LoginContext'

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
import ProtectedRoute from './features/ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path='/category/:category' element={<Home />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route
        path='/cart'
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path='/confirmation'
        element={
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<SignIn />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/dashboard/categories'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/dashboard/products'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
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
