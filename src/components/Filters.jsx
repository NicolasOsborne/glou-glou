import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Filters = () => {
  // Gestion du filtre de prix
  const [minPrice, setMinPrice] = useState(1)
  const [maxPrice, setMaxPrice] = useState(65)

  const handleSliderChange = (e) => {
    const value = e.target.value
    setMaxPrice(value)
  }

  const handleInput = (e) => {
    const value = e.target.value
    setMaxPrice(value)
  }

  // Gestion de la barre de recherche
  const [searchProduct, setSearchProduct] = useState('')

  const handleSearchInput = (e) => {
    const value = e.target.value
    setSearchProduct(value)
  }

  return (
    <aside className='filters-card'>
      <div className='filters-categories'>
        <h3 className='filters-categories_title'>Catégories</h3>
        <div className='filters-categories_list'>
          <Link to='/category/bieres' className='filters-category'>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Bières</p>
          </Link>
          <Link to='/category/vins' className='filters-category'>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Vins</p>
          </Link>
          <Link to='/category/spiritueux' className='filters-category'>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Spiritueux</p>
          </Link>
          <Link to='/category/sans-alcool' className='filters-category'>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Sans Alcool</p>
          </Link>
          <Link to='/category/boissons-chaudes' className='filters-category'>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Boissons Chaudes</p>
          </Link>
          <Link to='/category/nouveautes' className='filters-category'>
            <FaChevronRight className='filters-category_chevron' />
            <p className='filters-category_name'>Nouveautés</p>
          </Link>
        </div>
      </div>
      <div className='filters-price'>
        <h4 className='filters-price_title'>Prix</h4>
        <label htmlFor='price-range' className='filters-price_values'>
          {minPrice} € - {maxPrice} €
        </label>
        <input
          type='range'
          id='price-range'
          name='price-range'
          min={minPrice}
          max={65}
          value={maxPrice}
          onChange={handleSliderChange}
          onInput={handleInput}
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
          onInput={handleSearchInput}
        />
        <button className='filters-search_button'>
          <FaSearch size={13} className='filters-search_button_icon' />
        </button>
      </div>
    </aside>
  )
}

export default Filters
