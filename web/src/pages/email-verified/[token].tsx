import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getAPIClient } from '../../services/axios'
import Link from 'next/link'
import styles from '../../styles/EmailVerified.module.css'
import { useEffect } from 'react'
import { api } from '../../services/api'
import { useRouter } from 'next/router'

export default function EmailVerified() {
    const router = useRouter()
    const { token } = router.query

    useEffect(() => {
        api.patch('/user/verify/' + token)
        .then((response) => {
            console.log(response?.data)
        })
        .catch((err) => { console.error(err)})
    })

  return (
    <div className={styles.container}>
        <div className={styles.message}>
            <h3>Email verificado com sucesso!</h3>
            <p>
                Seu email foi verificado com sucesso!
            </p>
            <p>{}</p>
            <Link href="/dashboard">Voltar para home</Link>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx)

    const { ['nextts.token']: token } = parseCookies(ctx)

    const { data: { user } } = await apiClient.get('/user')

    console.info(user)

    if(!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return { 
        props: {
            userData: user
        }
    }
}

