import { useNavigate } from 'react-router-dom'

import CartItem from '../components/CartItem'
import Button from '../components/Button'

import { getProductImageURL } from '../utils/productUtils.js'

import { useContext } from 'react'
import { CartContext } from '../features/CartContext'

const Cart = () => {
  // Hook permettant de gérer la redirection vers la page de confirmation de la commande
  const navigate = useNavigate()

  const { cart, loading, handleValidateOrder } = useContext(CartContext)

  const calculateSubtotal = () => {
    if (Array.isArray(cart)) {
      return cart
        .reduce((acc, item) => {
          const price = parseFloat(item.produit.prix)
          const quantity = parseInt(item.quantity, 10)
          if (!isNaN(price) && !isNaN(quantity)) {
            return acc + price * quantity
          }
          return acc
        }, 0)
        .toFixed(2)
    } else {
      return '0.00'
    }
  }

  const calculateTotalQuantity = () => {
    if (Array.isArray(cart)) {
      return cart.reduce((acc, item) => acc + item.quantity, 0)
    } else {
      return 0
    }
  }

  // Gestion du click sur le bouton de validation de la commande
  const handleOrderValidation = async () => {
    try {
      await handleValidateOrder()
      navigate('/confirmation')
    } catch (error) {
      console.error('Error during order validation:', error)
    }
  }

  if (loading) {
    return <p>Chargement du panier...</p>
  }

  return (
    <section className='cart-page'>
      <div className='cart-items'>
        <h1 className='cart-items_title'>Panier</h1>
        <div className='cart-items_list'>
          {cart.map((item) => {
            const fullImageURL = getProductImageURL(item.produit.image)

            return (
              <CartItem
                key={item.id}
                cartItemId={item.id}
                cartItemImageSrc={fullImageURL}
                cartItemImageAlt={item.produit.nom}
                cartItemName={item.produit.nom}
                cartItemPrice={parseFloat(item.produit.prix)}
                cartItemQuantity={item.quantity}
                cartItemTotal={item.produit.prix * item.quantity}
              />
            )
          })}
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
              onClick={handleOrderValidation}
              className='cart-total_button'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
