import PropTypes from 'prop-types'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const DashboardProduct = ({
  productId,
  productName,
  productCategory,
  productPrice,
  productStock,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className='dashboard-item-card'>
      <div className='dashboard-item_details'>
        <h3 className='dashboard-item_details_id'>{productId}</h3>
        <p className='dashboard-item_details_info'>{productName}</p>
        <p className='dashboard-item_details_info'>{productCategory}</p>
        <p className='dashboard-item_details_info'>{productPrice} €</p>
        <p className='dashboard-item_details_info'>{productStock}</p>
      </div>
      <div className='dashboard-item_actions'>
        <FaRegEdit
          className='dashboard-item_actions_edit'
          size={20}
          onClick={onEditClick}
        />
        <FaRegTrashAlt
          className='dashboard-item_actions_delete'
          size={20}
          onClick={onDeleteClick}
        />
      </div>
    </div>
  )
}

DashboardProduct.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productStock: PropTypes.number.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default DashboardProduct
