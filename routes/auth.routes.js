import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/auth/signup', authController.postSignup);
authRouter.post('/auth/login', authController.postLogin);

export default authRouter;
