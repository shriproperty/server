import { Router } from 'express';
import {
	processRequestBody,
	processRequestParams,
	processRequestQuery,
} from 'zod-express-middleware';
import {
	getAllUsersHandler,
	getSingleUserHandler,
	resetPasswordHandler,
} from '../controllers/user.controller';
import {
	getSingleUserSchema,
	resetPasswordSchema,
} from '../schemas/user.schema';

const userRouter = Router();

userRouter.get('/users/all', getAllUsersHandler);
userRouter.get(
	'/users/single/:id',
	processRequestParams(getSingleUserSchema.params),
	processRequestQuery(getSingleUserSchema.query),
	getSingleUserHandler
);
userRouter.patch(
	'/users/reset-password',
	processRequestBody(resetPasswordSchema.body),
	resetPasswordHandler
);

export default userRouter;
