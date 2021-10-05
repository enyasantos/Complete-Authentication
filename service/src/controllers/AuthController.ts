import { Request, Response } from 'express';
import UserSchema from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import endpoint from '../../endpoints.config'

class AuthController {
    async auth(req: Request, res: Response) {
        try {
        const { email, password } = req.body;

        const user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        /*if (!user.emailVerified) {
            return res.status(401).json({ message: 'Email is not verified' });
        }*/

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id }, endpoint.KEYJWT, {
            expiresIn: '7d',
        })

        return res.status(200).json({
            token,
            user,
        })

        } catch (err) {
            return res.status(500).json({
                status: 'Internal error',
                error: err
            })
        }
    }
}

export default new AuthController();