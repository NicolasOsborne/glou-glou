import CategoryNavItem from './CategoryNavItem'

import { LuBeer, LuCoffee, LuCupSoda, LuWine } from 'react-icons/lu'
import { LiaCocktailSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

const CategoriesNav = () => {
  return (
    <section className='categories-nav'>
      <Link to='/category/bieres'>
        <CategoryNavItem
          categoryItemIcon={<LuBeer />}
          categoryItemName='Bières'
        />
      </Link>
      <Link to='/category/vins'>
        <CategoryNavItem
          categoryItemIcon={<LuWine />}
          categoryItemName='Vins'
        />
      </Link>
      <Link to='/category/spiritueux'>
        <CategoryNavItem
          categoryItemIcon={<LiaCocktailSolid />}
          categoryItemName='Spiritueux'
        />
      </Link>
      <Link to='/category/sans-alcool'>
        <CategoryNavItem
          categoryItemIcon={<LuCupSoda />}
          categoryItemName='Sans alcool'
        />
      </Link>
      <Link to='/category/boissons-chaudes'>
        <CategoryNavItem
          categoryItemIcon={<LuCoffee />}
          categoryItemName='Boissons chaudes'
        />
      </Link>
    </section>
  )
}

export default CategoriesNav
