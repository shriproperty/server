import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import {
	isLoggedInHandler,
	loginHandler,
	logoutHandler,
	signupHandler,
} from '../controllers/auth.controller';
import { loginSchema, signupSchema } from '../schemas/auth.schema';

const authRouter = Router();

authRouter.post('/auth/signup', processRequestBody(signupSchema.body), signupHandler);
authRouter.post('/auth/login', processRequestBody(loginSchema.body), loginHandler);
authRouter.get('/auth/is-logged-in', isLoggedInHandler);
authRouter.get('/auth/logout', logoutHandler);

export default authRouter;
