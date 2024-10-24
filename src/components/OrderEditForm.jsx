import { useState } from 'react'

import { PropTypes } from 'prop-types'

import Button from './Button'

const OrderEditForm = ({
  orderStatus,
  orderAmount,
  orderQuantity,
  orderCustomer,
  onFormSubmit,
}) => {
  const [status, setStatus] = useState(orderStatus)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Update the product information in the database (not implemented yet)
    console.log('Order information updated:')
    console.log('Status:', status)
    console.log('amount:', orderAmount)
    console.log('quantity:', orderQuantity)
    console.log('customer:', orderCustomer)
    onFormSubmit({ status, orderAmount, orderQuantity, orderCustomer })
  }

  return (
    <form className='edit-form' onSubmit={handleFormSubmit}>
      <div className='edit-form_entry'>
        <label>Statut :</label>
        <select
          className='edit-form_select'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value='En attente'>En attente</option>
          <option value='En cours'>En cours</option>
          <option value='Expédiée'>Expédiée</option>
          <option value='Livrée'>Livrée</option>
        </select>
      </div>
      <div className='edit-form_entry'>
        <label>Montant :</label>
        <input
          className='edit-form_input_number'
          value={orderAmount}
          readOnly
        />
      </div>
      <div className='edit-form_entry'>
        <label>Quantité de produits :</label>
        <input
          className='edit-form_input_number'
          value={orderQuantity}
          readOnly
        />
      </div>
      <div className='edit-form_entry'>
        <label>Client :</label>
        <input
          className='edit-form_input_number'
          value={orderCustomer}
          readOnly
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

OrderEditForm.propTypes = {
  orderStatus: PropTypes.string.isRequired,
  orderAmount: PropTypes.number.isRequired,
  orderQuantity: PropTypes.number.isRequired,
  orderCustomer: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default OrderEditForm
