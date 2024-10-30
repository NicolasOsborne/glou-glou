import PropTypes from 'prop-types'

const DashboardTop = ({
  productId,
  productName, // Assuming you have a name for the product
  totalSold,
}) => {
  return (
    <div className='dashboard-item-card'>
      <div className='dashboard-item_details'>
        <h3 className='dashboard-item_details_id'>{productId}</h3>
        <p className='dashboard-item_details_info'>{productName}</p>
        <p className='dashboard-item_details_info'>{totalSold}</p>
      </div>
    </div>
  )
}

DashboardTop.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired, // Add this if you have product names
  totalSold: PropTypes.number.isRequired,
}

export default DashboardTop
