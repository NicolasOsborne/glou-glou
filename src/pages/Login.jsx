import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log(
      `Login submitted with email: ${loginEmail} and password: ${loginPassword}`
    )
    navigate('/')
  }

  return (
    <section className='login-page'>
      <div className='login-card'>
        <h1 className='login_title'>Connexion</h1>
        <form className='login_form' onSubmit={handleLoginSubmit}>
          <div className='login_form_email'>
            <label className='login_form_label' htmlFor='email'>
              E-Mail :
            </label>
            <input
              className='login_form_input'
              id='email'
              name='email'
              placeholder='Votre e-mail...'
              //   value={loginEmail}
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
              //   value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Button className='login_form_button' buttonText='Connexion' />
        </form>
      </div>
    </section>
  )
}

export default Login
