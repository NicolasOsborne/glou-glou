import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

import useProducts from '../hooks/useProducts'

const ProductList = ({ filteredProducts, selectedCategory }) => {
  const { loading, error } = useProducts()

  if (loading) {
    return <p>Chargement des produits...</p>
  }

  if (error) {
    return <p>Erreur: {error}</p>
  }

  return (
    <div className='products'>
      <h1 className='products-title'>
        {selectedCategory ? selectedCategory.nameCategory : 'Tous les produits'}
      </h1>
      <div className='products-container'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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

ProductList.propTypes = {
  filteredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired,
      categorie: PropTypes.shape({
        nameCategory: PropTypes.string.isRequired,
      }).isRequired,
      prix: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.shape({
    nameCategory: PropTypes.string.isRequired,
  }),
}

export default ProductList
