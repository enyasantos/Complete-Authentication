import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import styles from './styles.module.css'

export default function VerifyEmail({ setStatus, email }) {

  const [ content, setContent ] = useState(false);

  function handlerClickOk() {
    setStatus(false)
  }

  function handlerChangedEmail() {
    setStatus(false)
  }

  useEffect(() => {
    api.post('/user/emailtoken')
    .then((response) => {
      console.log(response?.data?.token)
      api.post('/users/sendemail', {
        token: response?.data?.token,
        email
      })
    })
    .then(() => {
      setContent(true)
    })
    .catch((err) => { console.error(err)})
  }, [ email ])
  
  return (
      <div className={styles.container}>
          <div className={styles.message}>
            {content
            ? <>
                <h3>Email de verificação enviado!</h3>
                <p>
                    Esta ação requer um email verificado. 
                    Por favor, verifique sua caixa de entrada e siga a instruções
                    para verificação de email. Enviamos um email para:
                </p>
                <p>{}</p>
                <button onClick={handlerClickOk}>Ok</button>
                <button onClick={handlerChangedEmail}>Editar e-mail</button>
                <span>Caso não encontre o email, verifique o span e a lixeira.</span>
              </>
            : <>
                <h3>Error ao enviar email de verificação!</h3>
                <p>
                    Esta ação requer um email verificado. 
                    Infelizmente ocorreu um erro no envio de email.
                    Tente novamente mais tarde.
                </p>
                <button onClick={handlerClickOk}>Voltar</button>
              </>
            }
              
          </div>
      </div>
  )
}
