import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { isLoggedIn, login, logout, signup } from '../controllers/auth.controller';
import { loginSchema, signupSchema } from '../schemas/auth.schema';

const authRouter = Router();

authRouter.post('/auth/signup', processRequestBody(signupSchema.body), signup);
authRouter.post('/auth/login', processRequestBody(loginSchema.body), login);
authRouter.get('/auth/is-logged-in', isLoggedIn);
authRouter.get('/auth/logout', logout);
// authRouter.patch(
// 	'/auth/reset-password',
// 	resetPasswordChecks,
// 	authController.resetPassword
// );

export default authRouter;
