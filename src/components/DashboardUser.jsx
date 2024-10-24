import PropTypes from 'prop-types'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const DashboardUser = ({
  userId,
  userEmail,
  userRole,
  userOrders,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className='dashboard-item-card'>
      <div className='dashboard-item_details'>
        <h3 className='dashboard-item_details_id'>{userId}</h3>
        <p className='dashboard-item_details_info'>{userEmail}</p>
        <p className='dashboard-item_details_info'>{userRole}</p>
        <p className='dashboard-item_details_info'>{userOrders}</p>
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

DashboardUser.propTypes = {
  userId: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  userOrders: PropTypes.number.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default DashboardUser
