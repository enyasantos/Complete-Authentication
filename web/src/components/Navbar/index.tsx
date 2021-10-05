import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import styles from './styles.module.css'

interface INavbar {
    username: string | undefined
}

export default function Navbar({ username }: INavbar) {
    const { logOut } = useContext(AuthContext)
    
    function handlerLogout() {
        logOut()
    }

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.nav__logo}>
                    Frext
                </div>
                <nav className={styles.navbar}>
                    <li className={styles.nav__item}>
                        <Link href="/dashboard">Page1</Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link href="/dashboard">Page2</Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link href="/dashboard">Page3</Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link href="/dashboard">Page4</Link>
                    </li>
                    <li className={styles.nav__item}>
                        <Link href="/dashboard">Page5</Link>
                    </li>
                </nav>
                {username === undefined
                ? 
                    <div className={styles.user__info}>
                        <p className={styles.user}>Olá, {username}</p>
                        <button className={styles.btn__logout} onClick={handlerLogout}>Sair</button>
                    </div>
                : <p>Olá, visitante. <strong><Link href="/login">Faça login</Link></strong></p>
                }
            </div>
        </div>
    )
}