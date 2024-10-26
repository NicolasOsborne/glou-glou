import PropTypes from 'prop-types'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const DashboardCategory = ({
  categoryId,
  categoryName,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className='dashboard-item-card'>
      <div className='dashboard-item_details'>
        <h3 className='dashboard-item_details_id'>{categoryId}</h3>
        <p className='dashboard-item_details_info'>{categoryName}</p>
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

DashboardCategory.propTypes = {
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default DashboardCategory
