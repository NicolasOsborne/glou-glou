import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../api/api'

const useFilteredProducts = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetchProducts() // Call the API function
        const data = response.data // Get the products from the response
        // Filter products by category if a category is specified
        const filteredProducts = category
          ? data.filter(
              (product) =>
                product.categorie.nameCategory.toLowerCase() === category
            )
          : data
        setProducts(filteredProducts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductsData()
  }, [category])

  return { products, loading, error }
}

export default useFilteredProducts
