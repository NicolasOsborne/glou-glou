import { Link, NavLink } from 'react-router-dom'
import { FaRegUser, FaShoppingCart } from 'react-icons/fa'
import CategoriesNav from './CategoriesNav'
import Logo from '../assets/logos/logo-header.svg'
import MobileLogo from '../assets/logos/logo-mobile.svg'
import { useContext } from 'react'
import { CartContext } from '../features/CartContext'

const Header = () => {
  const { cart } = useContext(CartContext)

  const calculateTotalQuantity = () => {
    if (Array.isArray(cart)) {
      return cart.reduce((acc, item) => acc + item.quantity, 0)
    } else {
      return 0
    }
  }

  return (
    <>
      <header>
        <Link to='/' className='header-logo'>
          <img
            src={Logo}
            alt='Logo Glou & Glou'
            height={70}
            width={260}
            className='desktop-logo'
          />
          <img
            src={MobileLogo}
            alt='Logo Glou & Glou'
            height={60}
            width={48}
            className='mobile-logo'
          />
        </Link>
        <nav className='header-nav'>
          <NavLink to='/login' className='header-nav_login'>
            <FaRegUser />
            Connexion
          </NavLink>
          <NavLink to='/cart' className='header-nav_cart'>
            <FaShoppingCart />
            Panier ({calculateTotalQuantity()})
          </NavLink>
        </nav>
      </header>
      <CategoriesNav />
    </>
  )
}

export default Header
