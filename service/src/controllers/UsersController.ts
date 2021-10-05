import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user.interface'
import SendEmail from '../providers/nodemailer.provider'
import jwt from 'jsonwebtoken'
import endpoint from '../../endpoints.config'
import UserRepo from  '../repositories/user.repo'

interface IEmailJWT {
    user: string
}

class UsersController {

    async index(_: Request, res: Response) {
        try {
            const response = await UserRepo.findAll()

            return res.status(200).json({
                message: 'Successful list users',
                response
            })

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Internal error',
                error: err
            })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const id = req.params?.id

            const response = await UserRepo.findById(id)

            if(!id || !response) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            return res.status(200).json({
                message: 'Successful list user',
                response
            })
            
        } catch (err) {
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }

    async show1(req: Request, res: Response) {
        try {
            const id = req.userId

            const user = await UserRepo.findById(id)

            if(!id || !user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            return res.status(200).json({
                message: 'Successful list user',
                user
            })
            
        } catch (err) {
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }


    async create(req: Request, res: Response) {
        const {
            firstName,
            lastName,
            email,
            password,
        } : IUser = req.body

        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'All data was not provided correctly'
            })
        }

        try {

            const user = await UserRepo.findByEmail(email)
            if(user) {
                return res.status(409).json({
                    message: 'User already exists'
                })
            }


            const response = await UserRepo.create({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, 10),
            })

            return res.status(201).json({
                message: 'Successful create account',
                user: response
            })

        } catch(err) {
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }

   /* async sendEmail(req: Request, res: Response){
        try {
            const { userId } = req.body;

            const user = await UserRepo.findById(userId)
            if(!user) {
                return res.status(409).json({
                    message: 'User not exists'
                })
            }

            jwt.sign(
                { 
                    user: user?._id
                },
                endpoint.KEYEMAILVERIFY,
                {
                    expiresIn: '1m'
                },
                async (err, emailToken) => {
                    if(err) throw err

                    const url = 'http://localhost:3033/user/verify/' + emailToken

                    await SendEmail(
                        'enyalgs@gmail.com', 
                        user?.email, 
                        'Verificação de email', 
                        `
                        <h1>Verificação de email</h1>
                        <a href=${url} rel='noopener noreferrer' target="_blank">Verifique seu e-mail</a>
                        `
                    )

                    return res.status(200).json({
                        message: 'Email enviado com sucesso'
                    })
                }
            )

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }*/

    async emailVerifyGetToken(req: Request, res: Response) {
        try {
            const { userId } = req.body;

            const user = await UserRepo.findById(userId)
            if(!user) {
                return res.status(409).json({
                    message: 'User not exists'
                })
            }

            jwt.sign(
                { 
                    user: user?._id
                },
                endpoint.KEYEMAILVERIFY,
                {
                    expiresIn: '1m'
                },
                async (err, emailToken) => {
                    if(err) throw err

                    return res.status(200).json({
                        message: 'Token gerado com sucesso', 
                        token: emailToken
                    })
                }
            )
            
        } catch (err) {
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }

    async sendEmail(req: Request, res: Response){
        try {
            const { token, email } = req.body;


            const url = 'http://localhost:3000/email-verified/' + token

            await SendEmail(
                'enyalgs@gmail.com', 
                email, 
                'Verificação de email', 
                `
                <h1>Verificação de email</h1>
                <a href=${url} rel='noopener noreferrer' target="_blank">Verifique seu e-mail</a>
                `
            )

            return res.status(200).json({
                message: 'Email enviado com sucesso'
            })
            

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }

    async emailVerify(req: Request, res: Response) {
        try {
            const token = req.params?.token

            const { user } = jwt.verify(token, endpoint.KEYEMAILVERIFY) as IEmailJWT

            const response = await UserRepo.updatePropertyById(user, { emailVerified: true })

            if(!response) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            return res.status(200).json({
                status: 'Successful email verify',
                response
            }).redirect('http://localhost:3000/dashboard')
            
        } catch (err) {
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }
}

export default new UsersController()
