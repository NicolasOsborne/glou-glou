import PropTypes from 'prop-types'
import Button from './Button'
import NewTag from './NewTag'

const ProductCard = ({
  productImageSrc,
  productImageAlt,
  productName,
  productCategory,
  productPrice,
}) => {
  return (
    <div className='product-card'>
      <NewTag />
      <div className='product-card_image'>
        <img
          src={productImageSrc}
          alt={productImageAlt}
          width={112}
          height={112}
        />
      </div>
      <div className='product-card_info'>
        <h3 className='product-card_info_name'>{productName}</h3>
        <h4 className='product-card_info_category'>{productCategory}</h4>
      </div>
      <div className='product-card_price'>
        <div className='product-card_price_container'>
          <div className='inner-container'>
            <h5 className='product-card_price_amount'>{productPrice} €</h5>
          </div>
        </div>
        <div className='product-card_price_button_container'>
          <Button buttonText='Ajouter' />
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  productImageSrc: PropTypes.string.isRequired,
  productImageAlt: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
}

export default ProductCard
