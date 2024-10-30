import { useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

import { createCategory } from '../api/api'

const CategoryCreateForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const newCategory = await createCategory({
        nameCategory: name,
        descriptionCategory: description,
      })
      onFormSubmit(newCategory.data)
    } catch (error) {
      console.error('Error creating new category:', error)
    }
  }

  return (
    <form className='edit-form' onSubmit={handleFormSubmit}>
      <h3>Créer une nouvelle catégorie</h3>
      <div className='edit-form_entry'>
        <label>Nom :</label>
        <input
          className='edit-form_change'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='edit-form_entry'>
        <label>Description :</label>
        <textarea
          className='edit-form_change'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button
        className='edit-form_button'
        buttonText='Valider les modifications'
        type='submit'
      />
    </form>
  )
}

CategoryCreateForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default CategoryCreateForm
