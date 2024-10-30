import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { LoginContext } from './LoginContext'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(LoginContext)

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute
