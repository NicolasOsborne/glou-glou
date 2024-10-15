import { useNavigate } from 'react-router-dom'

import CartItem from '../components/CartItem'
import Button from '../components/Button'

import BeerImage from '../assets/products/beer.svg'
import WineImage from '../assets/products/wine.svg'
import AlcoholImage from '../assets/products/alcohol.svg'
import SoftDrinkImage from '../assets/products/soft-drink.svg'
import HotDrinkImage from '../assets/products/hot-drink.svg'

import { useContext } from 'react'
import { CartContext } from '../features/CartContext'

const Cart = () => {
  const getProductImageSrc = (category) => {
    switch (category) {
      case 1:
        return BeerImage
      case 2:
        return WineImage
      case 3:
        return AlcoholImage
      case 4:
        return SoftDrinkImage
      case 5:
        return HotDrinkImage
      default:
        return null
    }
  }

  const getProductImageAlt = (category) => {
    switch (category) {
      case 1:
        return 'Bière'
      case 2:
        return 'Vin'
      case 3:
        return 'Spiritueux'
      case 4:
        return 'Sans Alcool'
      case 5:
        return 'Boisson Chaude'
      default:
        return null
    }
  }

  // Hook permettant de gérer la redirection vers la page de confirmation de la commande
  const navigate = useNavigate()

  // Gestion du click sur le bouton de validation de la commande
  const handleCartValidation = () => {
    setCart([])
    navigate('/confirmation')
  }

  const { cart, setCart } = useContext(CartContext)

  const calculateSubtotal = () => {
    if (Array.isArray(cart)) {
      return cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    } else {
      return 0
    }
  }

  const calculateTotalQuantity = () => {
    if (Array.isArray(cart)) {
      return cart.reduce((acc, item) => acc + item.quantity, 0)
    } else {
      return 0
    }
  }

  return (
    <section className='cart-page'>
      <div className='cart-items'>
        <h1 className='cart-items_title'>Panier</h1>
        <div className='cart-items_list'>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              cartItemId={item.id}
              cartItemImageSrc={getProductImageSrc(item.category)}
              cartItemImageAlt={getProductImageAlt(item.category)}
              cartItemName={item.name}
              cartItemPrice={parseFloat(item.price)}
              cartItemQuantity={item.quantity}
              cartItemTotal={item.price * item.quantity}
            />
          ))}
        </div>
      </div>
      <div className='cart-total'>
        <h2 className='cart-total_title'>Total</h2>
        <div className='cart-total_card'>
          <div className='cart-total_details'>
            <div className='cart-total_items'>
              <h3 className='cart-total_items_title'>Articles :</h3>
              <span className='cart-total_items_value'>
                {calculateTotalQuantity()}
              </span>
            </div>
            <div className='cart-total_subtotal'>
              <h3 className='cart-total_subtotal_title'>Sous-total :</h3>
              <span className='cart-total_subtotal_value'>
                {calculateSubtotal()} €
              </span>
            </div>
            <div className='cart-total_shipping'>
              <h3 className='cart-total_shipping_title'>Livraison :</h3>
              <span className='cart-total_shipping_value'>Gratuite</span>
            </div>
          </div>
          <div className='cart-total_order'>
            <div className='cart-total_total'>
              <h4 className='cart-total_total_title'>Total :</h4>
              <span className='cart-total_value'>{calculateSubtotal()} €</span>
            </div>
            <Button
              buttonText='Valider la commande'
              onClick={handleCartValidation}
              className='cart-total_button'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
