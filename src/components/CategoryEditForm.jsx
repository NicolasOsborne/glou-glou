import { useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

const CategoryEditForm = ({
  categoryId,
  categoryName,
  categoryDescription,
  onFormSubmit,
}) => {
  const [name, setName] = useState(categoryName)
  const [description, setDescription] = useState(categoryDescription)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onFormSubmit({
      categoryId,
      categoryName: name,
      categoryDescription: description,
    })
  }

  return (
    <form className='edit-form' onSubmit={handleFormSubmit}>
      <div className='edit-form_entry'>
        <label>ID :</label>
        <input
          className='edit-form_readonly'
          value={categoryId}
          readOnly
        ></input>
      </div>
      <div className='edit-form_entry'>
        <label>Nom :</label>
        <input
          className='edit-form_change'
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

CategoryEditForm.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryDescription: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default CategoryEditForm
