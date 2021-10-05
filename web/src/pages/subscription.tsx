import { parseCookies } from 'nookies'
import { GetServerSideProps } from "next"
import { getAPIClient } from "../services/axios"
import Router from 'next/router'

export default function Subscription({ userData }) {
    return (
        <div>
            <h2>{userData.firstName} deseja se inscrever.</h2>
            <button onClick={() => Router.back()}>Voltar</button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx)

    const { ['nextts.token']: token } = parseCookies(ctx)

    const { data: { user } } = await apiClient.get('/user')

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