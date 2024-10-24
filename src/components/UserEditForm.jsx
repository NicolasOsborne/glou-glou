import { useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

const UserEditForm = ({ userEmail, userRole, userOrders, onFormSubmit }) => {
  const [role, setRole] = useState(userRole)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Update the product information in the database (not implemented yet)
    console.log('User information updated:')
    console.log('Email:', userEmail)
    console.log('Role:', role)
    console.log('Orders:', userOrders)
    onFormSubmit({ userEmail, role, userOrders })
  }

  return (
    <form className='edit-form' onSubmit={handleFormSubmit}>
      <div className='edit-form_entry'>
        <label>Utilisateur :</label>
        <input className='edit-form_input' value={userEmail} readOnly />
      </div>
      <div className='edit-form_entry'>
        <label>Rôle :</label>
        <select
          className='edit-form_select'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value='admin'>Admin</option>
          <option value='customer'>Client</option>
        </select>
      </div>
      <div className='edit-form_entry'>
        <label>Nombre de commande :</label>
        <input className='edit-form_input_number' value={userOrders} readOnly />
      </div>
      <Button
        className='edit-form_button'
        buttonText='Valider les modifications'
        type='submit'
      />
    </form>
  )
}

UserEditForm.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  userOrders: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default UserEditForm
