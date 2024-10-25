import { FaChevronRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import useCategories from '../hooks/useCategories'

const Filters = () => {
  const { categories, loading, error } = useCategories()

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
          {categories.map((category) => (
            <Link
              to={`/category/${category.nameCategory.toLowerCase()}`}
              className='filters-category'
              key={category.id}
            >
              <FaChevronRight className='filters-category_chevron' />
              <p className='filters-category_name'>{category.nameCategory}</p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Filters
