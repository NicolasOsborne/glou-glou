import PropTypes from 'prop-types'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const DashboardOrder = ({
  orderId,
  orderCustomer,
  orderStatus,
  orderAmount,
  orderQuantity,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className='dashboard-item-card'>
      <div className='dashboard-item_details'>
        <h3 className='dashboard-item_details_id'>{orderId}</h3>
        <p className='dashboard-item_details_info'>{orderStatus}</p>
        <p className='dashboard-item_details_info'>{orderAmount} €</p>
        <p className='dashboard-item_details_info'>{orderQuantity}</p>
        <p className='dashboard-item_details_info'>{orderCustomer}</p>
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

DashboardOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
  orderCustomer: PropTypes.number.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderAmount: PropTypes.number.isRequired,
  orderQuantity: PropTypes.number.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default DashboardOrder
