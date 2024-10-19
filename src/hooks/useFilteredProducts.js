import { useParams } from 'react-router-dom'
import products from '../mockDatabase/products.json'

const useFilteredProducts = () => {
  const { category } = useParams()

  return products.filter((product) => {
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
}

export default useFilteredProducts
