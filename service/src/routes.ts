import { Router } from 'express'
import AuthController from './controllers/AuthController';
import UsersController from './controllers/UsersController';
import authMiddleware from './middleware/auth.middleware';
const routes = Router();


routes.get('/', (req, res) => {
    res.send('Well done!');
})

routes.post('/auth', AuthController.auth);
routes.post('/register', UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', authMiddleware, UsersController.show);
routes.get('/user', authMiddleware, UsersController.show1);
routes.post('/users/sendemail', authMiddleware, UsersController.sendEmail);
routes.post('/user/emailtoken', authMiddleware, UsersController.emailVerifyGetToken);
routes.patch('/user/verify/:token', authMiddleware, UsersController.emailVerify);

export default routes