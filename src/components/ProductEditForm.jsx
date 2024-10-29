import { useEffect, useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

import { fetchCategories, updateProduct } from '../api/api'

import { getProductImageURL } from '../utils/productUtils.js'

const ProductEditForm = ({
  productId,
  productName,
  productCategory,
  productDescription,
  productPrice,
  productStock,
  productImage,
  onFormSubmit,
}) => {
  const [name, setName] = useState(productName)
  const [categoryId, setCategoryId] = useState(productCategory)
  const [description, setDescription] = useState(productDescription)
  const [price, setPrice] = useState(parseFloat(productPrice).toFixed(2))
  const [stockQuantity, setStockQuantity] = useState(productStock)
  const [image, setImage] = useState(productImage)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories()
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategoriesData()
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nameProduit', name)
    formData.append('categorie', Number(categoryId))
    formData.append('descriptionProduit', description)
    formData.append('price', Number(price))
    formData.append('quantiteProduit', Number(stockQuantity))
    if (image) {
      formData.append('imageProduit', image)
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value} (type: ${typeof value})`)
    }

    try {
      const response = await updateProduct(productId, formData)
      console.log('Form:', response.data)
      onFormSubmit(response.data)
    } catch (error) {
      console.error(
        'Error editing product:',
        error.response ? error.response.data : error
      )
    }
  }

  const fullImageURL = getProductImageURL(productImage)

  return (
    <form className='product-edit-form' onSubmit={handleFormSubmit}>
      <div className='product-edit-form_entry'>
        <label>Nom :</label>
        <input
          className='product-edit-form_name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Catégorie :</label>
        <select
          className='product-edit-form_category'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} type='number'>
              {cat.nameCategory}
            </option>
          ))}
        </select>
      </div>
      <div className='product-edit-form_entry'>
        <label>Description :</label>
        <textarea
          className='product-edit-form_description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Prix :</label>
        <input
          className='product-edit-form_price'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Stock :</label>
        <input
          className='product-edit-form_quantity'
          type='number'
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Image :</label>
        <div className='product-edit-form_image-display'>
          <img src={fullImageURL} alt={productName} />
        </div>
        <input
          className='product-edit-form_image'
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <Button
        className='product-edit-form_button'
        buttonText='Valider les modifications'
        type='submit'
      />
    </form>
  )
}

ProductEditForm.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
  productCategory: PropTypes.number.isRequired,
  productDescription: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productStock: PropTypes.number.isRequired,
  productImage: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
}

export default ProductEditForm
