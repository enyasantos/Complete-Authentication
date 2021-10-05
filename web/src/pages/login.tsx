import { useContext, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Login.module.css'
import Alert from '../components/Alert'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [alert, setAlert] = useState(false)
  const { signIn } = useContext(AuthContext)

  async function handlerSignIn({ email, password}) {
    try {
      await signIn({ email, password})
    } 
    catch(err) {
      setAlert(true);
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      {alert && 
      <Alert setStatus={setAlert} time={3000} severity="error">
        <p><strong>Login</strong> ou/e <strong>senha</strong> não estão corretos.</p>
      </Alert>
      }
      <section className={styles.side}>
        <h1>Frext</h1>
        <p>Sua plataforma online de autenticação</p>
      </section>
      <section className={styles.content}>
        <h2 className={styles.title}>Fazer login</h2>
        <p className={styles.subtitle}>Faça login para ter acesso total à plataforma</p>
        <form onSubmit={handleSubmit(handlerSignIn)} className={styles.form}>
          <div className={styles.input__person}>
            <input 
              {...register('email')}
              type="email" 
              className={styles.input} 
              name="email" 
              id="email" 
              required
            />
            <label htmlFor="email" className={styles.label}>E-mail</label>
          </div>
          <div className={styles.input__person}>
            <input 
              {...register('password')}
              type="password" 
              className={styles.input} 
              name="password" 
              id="password" 
              required
            />
            <label htmlFor="password" className={styles.label}>Senha</label>
          </div>
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
        <footer className={styles.register}>
          <p>Não tem uma conta? <Link href="/register">Cadastre-se</Link></p>
        </footer>
      </section>
    </div>
  )
}
