import PropTypes from 'prop-types'

const DashboardHeader = ({ currentView }) => {
  const renderHeaders = () => {
    switch (currentView) {
      case 'products':
        return (
          <div className='dashboard-header-entries'>
            <p className='dashboard-header_id'>ID</p>
            <p className='dashboard-header_entry'>Nom</p>
            <p className='dashboard-header_entry'>Catégorie</p>
            <p className='dashboard-header_entry'>Prix</p>
            <p className='dashboard-header_entry'>Stock</p>
          </div>
        )
      case 'categories':
        return (
          <div className='dashboard-header-entries'>
            <p className='dashboard-header_id'>ID</p>
            <p className='dashboard-header_entry'>Nom</p>
          </div>
        )
      case 'orders':
        return (
          <div className='dashboard-header-entries'>
            <p className='dashboard-header_id'>ID</p>
            <p className='dashboard-header_entry'>Client</p>
            <p className='dashboard-header_entry'>Statut</p>
          </div>
        )
    }
  }

  return <div className='dashboard-header'>{renderHeaders()}</div>
}

DashboardHeader.propTypes = {
  currentView: PropTypes.string,
}

export default DashboardHeader
