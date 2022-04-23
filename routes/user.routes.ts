import { Router } from 'express';
import {
	processRequestBody,
	processRequestParams,
	processRequestQuery,
} from 'zod-express-middleware';
import {
	getAll,
	getSingleUser,
	resetPassword,
} from '../controllers/user.controller';
import {
	getSingleUserSchema,
	resetPasswordSchema,
} from '../schemas/user.schema';

const userRouter = Router();

userRouter.get('/users/all', getAll);
userRouter.get(
	'/users/single/:id',
	processRequestParams(getSingleUserSchema.params),
	processRequestQuery(getSingleUserSchema.query),
	getSingleUser
);
userRouter.patch(
	'/users/reset-password',
	processRequestBody(resetPasswordSchema.body),
	resetPassword
);

export default userRouter;
