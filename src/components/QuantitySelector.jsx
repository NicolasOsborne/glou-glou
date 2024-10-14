import { useState } from 'react'
import PropTypes from 'prop-types'

const QuantitySelector = () => {
  const [productQuantity, setProductQuantity] = useState(1)

  const handleDecrement = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1)
    }
  }

  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1)
  }

  return (
    <div className='quantity-selector'>
      <button onClick={handleDecrement} className='quantity-selector_decrement'>
        -
      </button>
      <span className='quantity-selector_quantity'>{productQuantity}</span>
      <button onClick={handleIncrement} className='quantity-selector_increment'>
        +
      </button>
    </div>
  )
}

QuantitySelector.propTypes = {
  productQuantity: PropTypes.number.isRequired,
}

export default QuantitySelector
