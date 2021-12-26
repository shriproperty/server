import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/auth/signup', authController.postSignup);

export default authRouter;
