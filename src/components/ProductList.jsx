import { Link, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import useFilteredProducts from '../hooks/useFilteredProducts'
import useProducts from '../hooks/useProducts'

const ProductList = () => {
  const { category } = useParams()
  const { products: allProducts, loading, error } = useProducts()
  const { products: filteredProducts } = useFilteredProducts()

  const productsToDisplay = category ? filteredProducts : allProducts

  if (loading) {
    return <p>Chargement des produits...</p>
  }

  if (error) {
    return <p>Erreur: {error}</p>
  }

  return (
    <div className='products'>
      <h1 className='products-title'>
        {category ? category : 'Tous les produits'}
      </h1>
      <div className='products-container'>
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard
                productImageSrc={product.image}
                productImageAlt={product.nom}
                productName={product.nom}
                productCategory={product.categorie.nameCategory}
                productPrice={product.prix}
                productId={product.id}
              />
            </Link>
          ))
        ) : (
          <p>Pas de produits disponibles...</p>
        )}
      </div>
    </div>
  )
}

export default ProductList
