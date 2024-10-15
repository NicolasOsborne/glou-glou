import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addItemToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      )
    } else {
      setCart([...cart, item])
    }
  }

  const updateItemQuantity = (id, quantity) => {
    setCart(cart.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const removeItemFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
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
