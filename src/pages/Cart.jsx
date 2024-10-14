import PropTypes from 'prop-types'

import CartItem from '../components/CartItem'
import Button from '../components/Button'

import BeerImage from '../assets/products/beer.svg'
import WineImage from '../assets/products/wine.svg'
import AlcoholImage from '../assets/products/alcohol.svg'
import SoftDrinkImage from '../assets/products/soft-drink.svg'
import HotDrinkImage from '../assets/products/hot-drink.svg'

const Cart = ({ itemsQuantity, itemsSubTotal, cartTotal }) => {
  return (
    <section className='cart-page'>
      <div className='cart-items'>
        <h1 className='cart-items_title'>Panier</h1>
        <div className='cart-items_list'>
          <CartItem
            cartItemImageSrc={BeerImage}
            cartItemImageAlt='Bière'
            cartItemName='West Coast IPA'
            cartItemPrice={6.3}
            cartiItemQuantity={1}
            cartItemTotal={6.3}
          />
          <CartItem
            cartItemImageSrc={WineImage}
            cartItemImageAlt='Vin'
            cartItemName='Syrah'
            cartItemPrice={16.4}
            cartiItemQuantity={2}
            cartItemTotal={32.8}
          />
          <CartItem
            cartItemImageSrc={HotDrinkImage}
            cartItemImageAlt='Café'
            cartItemName='Blue Jamaica'
            cartItemPrice={9.2}
            cartiItemQuantity={1}
            cartItemTotal={9.2}
          />
        </div>
      </div>
      <div className='cart-total'>
        <h2 className='cart-total_title'>Total</h2>
        <div className='cart-total_card'>
          <div className='cart-total_details'>
            <div className='cart-total_items'>
              <h3 className='cart-total_items_title'>Articles :</h3>
              <span className='cart-total_items_value'>{itemsQuantity}</span>
            </div>
            <div className='cart-total_subtotal'>
              <h3 className='cart-total_subtotal_title'>Sous-total :</h3>
              <span className='cart-total_subtotal_value'>{itemsSubTotal}</span>
            </div>
            <div className='cart-total_shipping'>
              <h3 className='cart-total_shipping_title'>Livraison :</h3>
              <span className='cart-total_shipping_value'>Gratuite</span>
            </div>
          </div>
          <div className='cart-total_order'>
            <div className='cart-total_total'>
              <h4 className='cart-total_total_title'>Total :</h4>
              <span className='cart-total_value'>{cartTotal}</span>
            </div>
            <Button
              buttonText='Valider la commande'
              className='cart-total_button'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

Cart.propTypes = {
  itemsQuantity: PropTypes.number.isRequired,
  itemsSubTotal: PropTypes.number.isRequired,
  cartTotal: PropTypes.number.isRequired,
}

export default Cart
