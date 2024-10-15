import { useContext, useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

import users from '../mockDatabase/users.json'
import { LoginContext } from '../features/LoginContext'

const Login = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const { setIsLoggedIn } = useContext(LoginContext)

  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    )
    if (user) {
      setIsLoggedIn(true)
      navigate('/')
    }
  }

  return (
    <section className='login-page'>
      <div className='login-card'>
        <h1 className='login_title'>Connexion</h1>
        <form className='login_form' onSubmit={handleLogin}>
          <div className='login_form_email'>
            <label className='login_form_label' htmlFor='email'>
              E-Mail :
            </label>
            <input
              className='login_form_input'
              id='email'
              name='email'
              placeholder='Votre e-mail...'
              type='email'
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className='login_form_password'>
            <label className='login_form_label' htmlFor='email'>
              Mot de passe :
            </label>
            <input
              className='login_form_input'
              id='password'
              name='password'
              placeholder='Votre mot de passe...'
              type='password'
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Button
            className='login_form_button'
            buttonText='Connexion'
            type='submit'
          />
        </form>
      </div>
    </section>
  )
}

export default Login
