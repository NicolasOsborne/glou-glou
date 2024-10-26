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

  const login = (token) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
    setUserRole('ROLE_ADMIN')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUserRole(null)
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, userRole }}>
      {children}
    </LoginContext.Provider>
  )
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LoginContext, LoginProvider }
