import { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'

interface IUser {
    _id: string
    email: string
    password: string
    firstName: string
    lastName: string
    emailVerified: boolean
    createdAt: string
}

interface ISignInData {
    email: string
    password: string
}

interface IAuthContext {
    isAuthenticated: boolean
    user: IUser
    signIn: (data: ISignInData) => Promise<void>
    logOut: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState<IUser | null>(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'nextts.token': token } = parseCookies()
        if(token){
            api.get('/user').then(response => {
                setUser(response.data.user)
            })
        }
    }, [])

    async function signIn({email, password}: ISignInData) {
        const response = await api.post('/auth', {
            email,
            password
        })

        const { token, user } = response.data

        setCookie(undefined, 'nextts.token', token, {
            maxAge: 60 * 60 * 1, //1 hour
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}` //attz token

        setUser(user)

        Router.push('/')
    }

    async function logOut() {
        destroyCookie(undefined, 'nextts.token')

        api.defaults.headers['Authorization'] = '' //attz token

        setUser(null)

        Router.push('/')
    }
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}