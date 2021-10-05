import { useState, useEffect } from 'react'
import styles from './styles.module.css'

export default function Alert({ setStatus, time, severity, children }) {
    const [type, setType] = useState('')
    const [animation, setAnimation] = useState(styles.animation__off)
    const [visibility, setVisibility] = useState(styles.alert__off)

    const parser = new DOMParser()

    useEffect(() => {
        if(severity === 'error') setType(styles.alert__error)
        else if(severity === 'info') setType(styles.alert__info)
        else if(severity === 'successful') setType(styles.alert__successful)
        else if(severity === 'warning') setType(styles.alert__warning)

        setVisibility(styles.alert_on)
        
        setTimeout(() => {
            setAnimation(styles.animation__on)
        }, 10)
        setTimeout(() => {
            setAnimation(styles.animation__off)
        }, time)
        setTimeout(() => {
            setVisibility(styles.alert_off)
        }, time + 10)
        setTimeout(() => {
            setStatus(false)
        }, time + 120)
    }, [setStatus, type, severity, time])

    return (
        <div className={[styles.content, type, visibility, animation].join(' ')}>
            {children}
        </div>
    )
}