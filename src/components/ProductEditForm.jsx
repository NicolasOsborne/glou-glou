import { useEffect, useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

import { fetchCategories } from '../api/api'

const ProductEditForm = ({
  productName,
  productCategory,
  productDescription,
  productPrice,
  productStock,
  onFormSubmit,
}) => {
  const [name, setName] = useState(productName)
  const [category, setCategory] = useState(productCategory)
  const [description, setDescription] = useState(productDescription)
  const [price, setPrice] = useState(parseFloat(productPrice).toFixed(2))
  const [stockQuantity, setStockQuantity] = useState(productStock)
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Update the product information in the database (not implemented yet)
    console.log('Product information updated:')
    console.log('Name:', name)
    console.log('Category:', category)
    console.log('Description:', description)
    console.log('Price:', price)
    console.log('Stock Quantity:', stockQuantity)
    onFormSubmit({ name, category, description, price, stockQuantity })
  }

  return (
    <form className='product-edit-form' onSubmit={handleFormSubmit}>
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

ProductEditForm.propTypes = {
  productName: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  productDescription: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productStock: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default ProductEditForm
