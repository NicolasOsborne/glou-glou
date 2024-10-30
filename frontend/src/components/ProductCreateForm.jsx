import { useEffect, useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

import { fetchCategories, createProduct } from '../api/api'

const ProductCreateForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0.0)
  const [stockQuantity, setStockQuantity] = useState(0)
  const [image, setImage] = useState(null)
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
    formData.append('categorie', categoryId)
    formData.append('descriptionProduit', description)
    formData.append('price', price)
    formData.append('quantiteProduit', stockQuantity)
    formData.append('imageProduit', image)

    try {
      const response = await createProduct(formData)
      console.log('Form:', response.data)
      onFormSubmit(response.data)
    } catch (error) {
      console.error('Error creating new product:', error.response.data)
    }
  }

  return (
    <form className='product-edit-form' onSubmit={handleFormSubmit}>
      <h3>Créer un nouveau produit</h3>
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
          <option value='' disabled>
            Sélectionner une catégorie
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
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
        buttonText='Créer le produit'
        type='submit'
      />
    </form>
  )
}

ProductCreateForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default ProductCreateForm
