import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/api'

const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories()
        setCategories(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoriesData()
  }, [])

  return { categories, loading, error }
}

export default useCategories
