import { createContext, useEffect, useState, useContext } from 'react'
import { PropTypes } from 'prop-types'
import { addToCart, fetchUserCart, validateOrder } from '../api/api'
import { LoginContext } from './LoginContext'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const { isLoggedIn } = useContext(LoginContext)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn) {
        setCart([])
        setLoading(false)
        return
      }
      try {
        const response = await fetchUserCart()
        setCart(response.data.cartItems)
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [isLoggedIn])

  const addItemToCart = async (item) => {
    try {
      const response = await addToCart(item.id)
      if (response.status === 201) {
        // Optionally, you can refetch the cart or update the state directly
        const updatedCart = await fetchUserCart()
        setCart(updatedCart.data.cartItems)
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  // const updateItemQuantity = (id, quantity) => {
  //   setCart(cart.map((i) => (i.id === id ? { ...i, quantity } : i)))
  // }

  // const removeItemFromCart = (id) => {
  //   setCart(cart.filter((i) => i.id !== id))
  // }

  const handleValidateOrder = async () => {
    try {
      const response = await validateOrder()
      if (response.status === 200) {
        setCart([])
      }
    } catch (error) {
      console.error('Error validating order:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItemToCart,
        // updateItemQuantity,
        // removeItemFromCart,
        handleValidateOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { CartProvider, CartContext }
