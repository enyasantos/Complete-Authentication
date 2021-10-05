import { useContext, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Login.module.css'
import Alert from '../components/Alert'
import { useForm } from 'react-hook-form'
import { api } from '../services/api'

export default function Register() {
  const { register, handleSubmit } = useForm()
  const [alert, setAlert] = useState(false)
  const [ messageAlert, setMessageAlert] = useState('')

  async function handlerSignUp({ firstName, lastName, email, password }) {
    try {
        const response = await api.post('/register', {
            firstName, 
            lastName, 
            email, 
            password
        })

        const { _id } = response?.data

        await api.post('/users/sendemail', {
            userId: _id
        })

    } catch(err) {
      setAlert(true);
      if(err?.response?.data?.message === "User already exists") {
        setMessageAlert('Email já está cadastrado.')
      } else {
        setMessageAlert('Error ao cadastrar uma nova conta, verifique os dados.')
      }
    }
  }

  return (
    <div className={styles.container}>
      {alert && 
      <Alert setStatus={setAlert} time={3000} severity="error">
        {messageAlert}
      </Alert>
      }
      <section className={styles.side}>
        <h1>Frext</h1>
        <p>Sua plataforma online de autenticação</p>
      </section>
      <section className={styles.content}>
        <h2 className={styles.title}>Cadastrar nova conta</h2>
        <p className={styles.subtitle}>Faça o cadastro para ter sua propria conta na plataforma</p>
        <form onSubmit={handleSubmit(handlerSignUp)} className={styles.form}>
            <div className={styles.input__person}>
            <input 
              {...register('firstName')}
              type="text" 
              className={styles.input} 
              name="firstName" 
              id="firstName" 
              min={3}
              required
            />
            <label htmlFor="firstName" className={styles.label}>Nome</label>
          </div>
          <div className={styles.input__person}>
            <input 
              {...register('lastName')}
              type="text" 
              className={styles.input} 
              name="lastName" 
              id="lastName" 
              min={3}
              required
            />
            <label htmlFor="lastName" className={styles.label}>Sobrenome</label>
          </div>
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
              min={4}
              required
            />
            <label htmlFor="password" className={styles.label}>Senha</label>
          </div>
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        <footer className={styles.register}>
          <p>Já possui uma conta? <Link href="/">Faça login</Link></p>
        </footer>
      </section>
    </div>
  )
}
