import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/api'

const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetchProducts() // Call the API function
        setProducts(response.data) // Set the products from the response
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductsData()
  }, [])

  return { products, loading, error }
}

export default useProducts
