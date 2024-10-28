import { FaChevronRight } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'

import useCategories from '../hooks/useCategories'

import { filterByCategory } from '../api/api'

const Filters = ({
  setFilteredProducts,
  setSelectedCategory,
  handleShowAllProducts,
}) => {
  const { categories, loading, error } = useCategories()

  const handleCategoryClick = async (category) => {
    try {
      const response = await filterByCategory(category.id)
      setFilteredProducts(response)
      setSelectedCategory(category)
    } catch (error) {
      console.error('Error filtering products:', error)
    }
  }

  if (loading) {
    return <p>Chargement des catégories...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <aside className='filters-card'>
      <div className='filters-categories'>
        <h3 className='filters-categories_title'>Catégories</h3>
        <div className='filters-categories_list'>
          <div className='filters-category' onClick={handleShowAllProducts}>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Tous les produits</p>
          </div>
          {categories.map((category) => (
            <div
              className='filters-category'
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <FaChevronRight className='filters-category_chevron' />
              <p className='filters-category_name'>{category.nameCategory}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='filters-new'>
        <FaChevronRight className='filters-category_chevron' />
        <p className='filters-new_name'>Nouveautés</p>
      </div>
      <div className='filters-price'>
        <h4 className='filters-price_title'>Prix</h4>
        <label htmlFor='price-range' className='filters-price_values'>
          1 € - 65 €
        </label>
        <input
          type='range'
          id='price-range'
          name='price-range'
          min={1}
          max={65}
          className='filters-price_range'
        />
      </div>
      <div className='filters-search'>
        <input
          type='search'
          id='search-bar'
          name='search'
          className='filters-search_input'
          placeholder='Chercher un produit...'
        />
        <button className='filters-search_button'>
          <FaSearch size={13} className='filters-search_button_icon' />
        </button>
      </div>
    </aside>
  )
}

Filters.propTypes = {
  setFilteredProducts: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  handleShowAllProducts: PropTypes.func.isRequired,
}

export default Filters
