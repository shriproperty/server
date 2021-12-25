import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
const authRouter = Router();

authRouter.route('/signup').get(authController.getSignup);

export default authRouter;
