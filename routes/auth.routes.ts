import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { signup } from '../controllers/auth.controller';
import { signupSchema } from '../schemas/auth.schema';

const authRouter = Router();

authRouter.post('/auth/signup', processRequestBody(signupSchema.body), signup);
// authRouter.post('/auth/login', loginValidationChecks, authController.login);
// authRouter.get('/auth/is-logged-in', authController.isLoggedIn);
// authRouter.get('/auth/logout', authController.logout);
// authRouter.patch(
// 	'/auth/reset-password',
// 	resetPasswordChecks,
// 	authController.resetPassword
// );

export default authRouter;
