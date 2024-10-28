import Filters from '../components/Filters'
import QuantitySelector from '../components/QuantitySelector'
import Button from '../components/Button'

import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { getProductImageURL } from '../utils/productUtils'

import { CartContext } from '../features/CartContext'
import { fetchProducts } from '../api/api'

const ProductPage = () => {
  // Gestion de la redirection
  const navigate = useNavigate()

  // Récupérer l'id du produit dans l'URL
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addItemToCart } = useContext(CartContext)

  // Rechercher le produit en fonction de l'id dans l'URL
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetchProducts()
        const products = response.data
        const currentProduct = products.find(
          (product) => product.id === parseInt(id)
        )

        if (!currentProduct) {
          throw new Error('Produit non trouvé')
        }
        setProduct(currentProduct)
      } catch (err) {
        setError(err.message)
        navigate('/error')
      } finally {
        setLoading(false)
      }
    }
    fetchProductData()
  }, [id, navigate])

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (product) {
      addItemToCart({
        id: product.id,
        quantity: quantity,
      })
    }
  }

  if (loading) {
    return <p>Chargement du produit...</p>
  }

  if (error) {
    return <p>Erreur: {error}</p>
  }

  return (
    <section className='product-page'>
      <div className='product-page_content-container'>
        <Filters />
        <div className='product-container'>
          <div className='product_image'>
            <img
              src={getProductImageURL(product.image)}
              alt={product.nom}
              height={150}
              width={150}
            />
          </div>
          <div className='product-details'>
            <>
              <h2 className='product-details_name'>{product.nom}</h2>
              <h3 className='product-details_category'>
                {product.categorie.nameCategory}
              </h3>
              <p className='product-details_description'>
                {product.description}
              </p>
              <p className='product-details_price'>
                {product.prix.toFixed(2)} €
              </p>
              <p
                className={`product-details_status ${
                  product.quantite > 0 ? 'in-stock' : 'out-of-stock'
                }`}
              >
                {product.quantite > 0 ? 'En stock' : 'Rupture de stock'}
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
