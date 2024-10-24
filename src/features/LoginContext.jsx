import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}
    >
      {children}
    </LoginContext.Provider>
  )
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LoginContext, LoginProvider }
