import PropTypes from 'prop-types'

import QuantitySelector from './QuantitySelector'

import { FaRegTrashAlt } from 'react-icons/fa'

import { useContext } from 'react'
import { CartContext } from '../features/CartContext'

const CartItem = ({
  cartItemImageSrc,
  cartItemImageAlt,
  cartItemName,
  cartItemPrice,
  cartItemQuantity,
  cartItemTotal,
  cartItemId,
}) => {
  const { updateItemQuantity, removeItemFromCart } = useContext(CartContext)

  const handleUpdateQuantity = (newQuantity) => {
    updateItemQuantity(cartItemId, newQuantity)
  }

  const handleRemoveItem = () => {
    removeItemFromCart(cartItemId)
  }

  return (
    <div className='cart-item-card'>
      <div className='cart-item'>
        <div className='cart-item_image'>
          <img
            src={cartItemImageSrc}
            alt={cartItemImageAlt}
            height={64}
            width={64}
          />
        </div>
        <div className='cart-item_details'>
          <h3 className='cart-item_details_name'>{cartItemName}</h3>
          <h4 className='cart-item_details_price'>
            {cartItemPrice.toFixed(2)} €
          </h4>
        </div>
      </div>
      <div className='cart-item_amount'>
        <QuantitySelector
          className='cart-item_amount_quantity'
          value={cartItemQuantity}
          onChange={handleUpdateQuantity}
          productQuantity={cartItemQuantity}
        />
        <div className='cart-item_amount_total'>
          {cartItemTotal.toFixed(2)} €
        </div>
        <FaRegTrashAlt
          onClick={handleRemoveItem}
          className='cart-item_amount_delete'
        />
      </div>
    </div>
  )
}

CartItem.propTypes = {
  cartItemImageSrc: PropTypes.string.isRequired,
  cartItemImageAlt: PropTypes.string.isRequired,
  cartItemName: PropTypes.string.isRequired,
  cartItemPrice: PropTypes.number.isRequired,
  cartItemQuantity: PropTypes.number.isRequired,
  cartItemTotal: PropTypes.number.isRequired,
  cartItemId: PropTypes.number.isRequired,
}

export default CartItem
