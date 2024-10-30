import { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import { fetchProducts } from '../api/api'

const Home = () => {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        const response = await fetchProducts()
        setAllProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    loadAllProducts()
  }, [])

  const handleShowAllProducts = () => {
    setFilteredProducts(allProducts)
    setSelectedCategory(null)
  }

  return (
    <section className='homepage'>
      <Hero />
      <div className='homepage-content-container'>
        <Filters
          setFilteredProducts={setFilteredProducts}
          setSelectedCategory={setSelectedCategory}
          handleShowAllProducts={handleShowAllProducts}
        />
        <ProductList
          filteredProducts={filteredProducts}
          selectedCategory={selectedCategory}
        />
      </div>
    </section>
  )
}

export default Home
