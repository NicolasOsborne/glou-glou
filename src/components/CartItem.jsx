import PropTypes from 'prop-types'

import QuantitySelector from './QuantitySelector'

import { FaRegTrashAlt } from 'react-icons/fa'

const CartItem = ({
  cartItemImageSrc,
  cartItemImageAlt,
  cartItemName,
  cartItemPrice,
  cartItemQuantity,
  cartItemTotal,
}) => {
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
          <h4 className='cart-item_details_price'>{cartItemPrice} €</h4>
        </div>
      </div>
      <div className='cart-item_amount'>
        <QuantitySelector
          className='cart-item_amount_quantity'
          productQuantity={cartItemQuantity}
        />
        <div className='cart-item_amount_total'>{cartItemTotal} €</div>
        <FaRegTrashAlt className='cart-item_amount_delete' />
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
}

export default CartItem
