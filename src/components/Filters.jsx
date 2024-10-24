import { FaChevronRight } from 'react-icons/fa6'

import { Link } from 'react-router-dom'

const Filters = () => {
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
        </div>
      </div>
    </aside>
  )
}

export default Filters
