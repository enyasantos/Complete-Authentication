import styles from './styles.module.css'

interface ICard {
    title: string
    description: string
    handlerSubscribe?(): void
}

export default function Card({ title, description, handlerSubscribe }: ICard) {
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.description}>{description}</p>
            <button className={styles.btn__subscription} onClick={handlerSubscribe}>Inscrever-se</button>
        </div>
    )
}