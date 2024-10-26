import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/api'

const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetchProducts()
        setProducts(response.data)
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
