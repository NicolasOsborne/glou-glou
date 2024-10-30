import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Error = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate('/')
  }

  return (
    <section className='error-page'>
      <div className='error-card'>
        <h1 className='error-card_title'>Erreur 404</h1>
        <p className='error-card_text'>
          Oops !
          <br />
          La page que vous cherchez n'existe pas...
        </p>
        <Button
          className='error-card_button'
          buttonText="Page d'accueil"
          onClick={handleBackHome}
        />
      </div>
    </section>
  )
}

export default Error
