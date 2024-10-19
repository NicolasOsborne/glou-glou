import BeerImage from '../assets/products/beer.svg'
import WineImage from '../assets/products/wine.svg'
import AlcoholImage from '../assets/products/alcohol.svg'
import SoftDrinkImage from '../assets/products/soft-drink.svg'
import HotDrinkImage from '../assets/products/hot-drink.svg'
import categories from '../mockDatabase/categories.json'

export const getProductImageSrc = (category) => {
  switch (category) {
    case 1:
      return BeerImage
    case 2:
      return WineImage
    case 3:
      return AlcoholImage
    case 4:
      return SoftDrinkImage
    case 5:
      return HotDrinkImage
    default:
      return null
  }
}

export const getProductImageAlt = (category) => {
  switch (category) {
    case 1:
      return 'Bière'
    case 2:
      return 'Vin'
    case 3:
      return 'Spiritueux'
    case 4:
      return 'Sans Alcool'
    case 5:
      return 'Boisson Chaude'
    default:
      return null
  }
}

export const getProductCategory = (category) => {
  const categoryData = categories.find((c) => c.id === category)
  return categoryData ? categoryData.name : null
}
