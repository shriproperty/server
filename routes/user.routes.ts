import { Router } from 'express';
import {
	processRequestBody,
	processRequestParams,
	processRequestQuery,
} from 'zod-express-middleware';
import {
	getAllHandler,
	getSingleUserHandler,
	resetPasswordHandler,
} from '../controllers/user.controller';
import {
	getSingleUserSchema,
	resetPasswordSchema,
} from '../schemas/user.schema';

const userRouter = Router();

userRouter.get('/users/all', getAllHandler);
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
