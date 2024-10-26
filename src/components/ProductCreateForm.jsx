import { useEffect, useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

import { fetchCategories, createProduct } from '../api/api'

const ProductCreateForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0.0)
  const [stockQuantity, setStockQuantity] = useState(0)
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
    try {
      const newProduct = await createProduct({
        name,
        category,
        description,
        price,
        stockQuantity,
      })
      onFormSubmit(newProduct)
    } catch (error) {
      console.error('Error creating new product:', error)
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
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Catégorie :</label>
        <select
          className='product-edit-form_category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.nameCategory}>
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
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Prix :</label>
        <input
          className='product-edit-form_price'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='product-edit-form_entry'>
        <label>Stock :</label>
        <input
          className='product-edit-form_quantity'
          type='number'
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
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

ProductCreateForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default ProductCreateForm
