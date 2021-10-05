import { GetServerSideProps } from "next"
import styles from '../styles/Home.module.css'
import { useContext, useState } from "react"
import Navbar from "../components/Navbar"
import VerifyEmail from "../components/VerifyEmail"
import Card from "../components/Card"
import Router from 'next/router'
import { AuthContext } from "../contexts/AuthContext"

export default function Dashboard(){
    const { user, isAuthenticated } = useContext(AuthContext)
    const [ alertEmail, setAlertEmail ] = useState(false)

    function handlerSubscribe() {
        if(!isAuthenticated) {
          Router.push('/login')
        } else {
          if(!user?.emailVerified) {
            setAlertEmail(true);
          } else {
              Router.push('/subscription')
          }
        }
    }

    return(
        <>
        {alertEmail && <VerifyEmail email={user?.email} setStatus={setAlertEmail}/>}
        <div className={styles.container}>
            <Navbar username={user?.firstName + ' ' + user?.lastName}/>
            <div className={styles.content}>
                <h2>Inicio</h2>
                <Card 
                    title="Curso de Javascript ES6"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                    handlerSubscribe={handlerSubscribe}
                />
            </div>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    return { 
        props: {}
    }
}
