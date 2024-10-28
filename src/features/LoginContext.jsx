import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [username, setUsername] = useState(null)

  // Custom function to decode JWT
  function decodeJWT(token) {
    const payloadBase64 = token.split('.')[1] // Extract the second part of the token
    const payloadJson = atob(payloadBase64) // Decode from base64
    return JSON.parse(payloadJson) // Convert to JSON object
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      const decodedToken = decodeJWT(token) // Use custom decode function
      setUserRole(decodedToken.roles ? decodedToken.roles[0] : null)
      setUsername(decodedToken.username || null)
    }
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
    const decodedToken = decodeJWT(token) // Use custom decode function
    setUserRole(decodedToken.roles ? decodedToken.roles[0] : null) // Set user role
    setUsername(decodedToken.username || null) // Set username
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUserRole(null)
    setUsername(null) // Clear username on logout
  }

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, login, logout, userRole, username }}
    >
      {children}
    </LoginContext.Provider>
  )
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LoginContext, LoginProvider }
