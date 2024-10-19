import { Link, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import useFilteredProducts from '../hooks/useFilteredProducts'
import {
  getProductImageSrc,
  getProductImageAlt,
  getProductCategory,
} from '../utils/productUtils'

const ProductList = () => {
  const filteredProducts = useFilteredProducts()
  const { category } = useParams()

  return (
    <div className='products'>
      <h1 className='products-title'>{category}</h1>
      <div className='products-container'>
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <ProductCard
              productImageSrc={getProductImageSrc(product.category)}
              productImageAlt={getProductImageAlt(product.category)}
              productName={product.name}
              productCategory={getProductCategory(product.category)}
              productPrice={product.price}
              productId={product.id}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList
