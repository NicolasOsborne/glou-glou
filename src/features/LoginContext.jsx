import { createContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

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
