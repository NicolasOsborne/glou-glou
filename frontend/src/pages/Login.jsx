import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../features/LoginContext'
import { loginUser } from '../api/api'

import Button from '../components/Button'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(LoginContext)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      })
      login(response.data.token, response.data.role)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Erreur de connexion')
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    navigate('/signin')
  }

  return (
    <section className='login-page'>
      <div className='login-card'>
        <h1 className='login_title'>Connexion</h1>
        {error && <p className='error'>{error}</p>}
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
              required
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
              required
            />
          </div>
          <Button
            className='login_form_button'
            buttonText='Connexion'
            type='submit'
          />
        </form>
        <Button
          className='navigate_button'
          buttonText="Je n'ai pas de compte"
          onClick={handleSignIn}
        />
      </div>
    </section>
  )
}

export default Login
