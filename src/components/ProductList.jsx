import { Link, useParams } from 'react-router-dom'

import ProductCard from './ProductCard'
import BeerImage from '../assets/products/beer.svg'
import WineImage from '../assets/products/wine.svg'
import AlcoholImage from '../assets/products/alcohol.svg'
import SoftDrinkImage from '../assets/products/soft-drink.svg'
import HotDrinkImage from '../assets/products/hot-drink.svg'

import products from '../mockDatabase/products.json'
import categories from '../mockDatabase/categories.json'

const ProductList = () => {
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

  const getProductCategory = (category) => {
    const categoryData = categories.find((c) => c.id === category)
    return categoryData ? categoryData.name : null
  }

  const { category } = useParams()

  const filteredProducts = products.filter((product) => {
    switch (category) {
      case 'bieres':
        return product.category === 1
      case 'vins':
        return product.category === 2
      case 'spiritueux':
        return product.category === 3
      case 'sans-alcool':
        return product.category === 4
      case 'boissons-chaudes':
        return product.category === 5
      default:
        return true
    }
  })

  return (
    <div className='products'>
      <h1 className='products-title'>Nouveautés</h1>
      <div className='products-container'>
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <ProductCard
              key={product.id}
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
