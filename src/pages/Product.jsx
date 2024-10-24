import Filters from '../components/Filters'
import QuantitySelector from '../components/QuantitySelector'
import Button from '../components/Button'

import { useNavigate, useParams } from 'react-router-dom'

import BeerImage from '../assets/products/beer.svg'
import WineImage from '../assets/products/wine.svg'
import AlcoholImage from '../assets/products/alcohol.svg'
import SoftDrinkImage from '../assets/products/soft-drink.svg'
import HotDrinkImage from '../assets/products/hot-drink.svg'

import products from '../mockDatabase/products.json'

import { useContext, useState } from 'react'
import { CartContext } from '../features/CartContext'

const ProductPage = () => {
  // Gestion de la redirection
  const navigate = useNavigate()

  // Récupérer l'id du produit dans l'URL
  const { id } = useParams()
  const product = products.find((product) => product.id === parseInt(id))

  if (!product) {
    navigate('/error')
  }

  // Définir les images en fonction de la catégorie du produit
  const getProductImageSrc = (category) => {
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

  const getProductImageAlt = (category) => {
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

  const getProductCategory = (category) => {
    switch (category) {
      case 1:
        return 'Bières'
      case 2:
        return 'Vins'
      case 3:
        return 'Spiritueux'
      case 4:
        return 'Sans Alcool'
      case 5:
        return 'Boissons Chaudes'
      default:
        return null
    }
  }

  // Gestion de l'ajout de produits au panier
  const { addItemToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price.toFixed(2),
      quantity: quantity,
    })
  }

  return (
    <section className='product-page'>
      <div className='product-page_content-container'>
        <Filters />
        <div className='product-container'>
          <div className='product_image'>
            <img
              src={getProductImageSrc(product.category)}
              alt={getProductImageAlt(product.category)}
              height={150}
              width={150}
            />
          </div>
          <div className='product-details'>
            <>
              <h2 className='product-details_name'>{product.name}</h2>
              <h3 className='product-details_category'>
                {getProductCategory(product.category)}
              </h3>
              <p className='product-details_description'>
                {product.description}
              </p>
              <p className='product-details_price'>
                {product.price.toFixed(2)} €
              </p>
              <p
                className={`product-details_status ${
                  product.stock > 0 ? 'in-stock' : 'out-of-stock'
                }`}
              >
                {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
              </p>
              <div className='product-details_add-to-cart-container'>
                <QuantitySelector
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <Button
                  buttonText='Ajouter au panier'
                  onClick={handleAddToCart}
                  className='product-details_add-to-cart_button'
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
