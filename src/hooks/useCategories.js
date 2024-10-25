import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/api'

const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories() // Call the API function
        setCategories(response.data) // Set the categories from the response
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
