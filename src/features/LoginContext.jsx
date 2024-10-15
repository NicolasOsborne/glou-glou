import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  )
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LoginContext, LoginProvider }
