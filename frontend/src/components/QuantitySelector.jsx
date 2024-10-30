import PropTypes from 'prop-types'
import { useState } from 'react'

const QuantitySelector = ({ value, onChange }) => {
  const [productQuantity, setProductQuantity] = useState(value)

  const handleDecrement = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1)
      onChange(productQuantity - 1)
    }
  }

  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1)
    onChange(productQuantity + 1)
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
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default QuantitySelector
