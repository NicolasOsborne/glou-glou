import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const handleSignIn = () => {
    navigate('/')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <section className='login-page'>
      <div className='login-card'>
        <h1 className='login_title'>Création de compte</h1>
        <form className='login_form' onSubmit={handleSignIn}>
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
