import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../features/LoginContext'

import { registerUser } from '../api/api'

import Button from '../components/Button'

const SignIn = () => {
  const navigate = useNavigate()

  const { setIsLoggedIn, setUserRole } = useContext(LoginContext)

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInName, setSignInName] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await registerUser({
        email: signInEmail,
        password: signInPassword,
        nom: signInName,
      })
      setIsLoggedIn(true)
      setUserRole(response.data.role)
      navigate('/')
    } catch (err) {
      setError(err.response.data.error || 'La création de compte a échouée')
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <section className='login-page'>
      <div className='login-card'>
        <h1 className='login_title'>Création de compte</h1>
        {error && <p className='error'>{error}</p>}
        <form className='login_form' onSubmit={handleSignIn}>
          <div className='login_form_name'>
            <label className='login_form_label' htmlFor='name'>
              Nom :
            </label>
            <input
              className='login_form_input'
              id='name'
              name='name'
              placeholder='Votre nom...'
              type='text'
              value={signInName}
              onChange={(e) => setSignInName(e.target.value)}
              required
            />
          </div>
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
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
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
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className='login_form_button'
            buttonText='Créer mon compte'
            type='submit'
          />
        </form>
        <Button
          className='navigate_button'
          buttonText="J'ai déjà un compte !"
          onClick={handleLogin}
        />
      </div>
    </section>
  )
}

export default SignIn
