import { Router } from 'express';
import {
	processRequestBody,
	processRequestParams,
} from 'zod-express-middleware';
import * as tempUserController from '../controllers/tempUser.controller';
import {
	deleteTempUserSchema,
	registerNewSchema,
	updateTempUserCallingStatusSchema,
} from '../schemas/tempUser.schema';

const tempUserRouter = Router();

tempUserRouter.post(
	'/temp-users/add',
	processRequestBody(registerNewSchema.body),
	tempUserController.registerNewTempUserHandler
);
tempUserRouter.get('/temp-users/all', tempUserController.getAllTempUsersHandler);
tempUserRouter.get('/temp-users/verify', tempUserController.verifyTempUserHandler);
tempUserRouter.patch(
	'/temp-users/update-calling-status/:id',
	processRequestBody(updateTempUserCallingStatusSchema.body),
	processRequestParams(updateTempUserCallingStatusSchema.params),
	tempUserController.updateTempUserCallingStatusHandler
);
tempUserRouter.delete(
	'/temp-users/delete/:id',
	processRequestParams(deleteTempUserSchema.params),
	tempUserController.deleteTempUserHandler
);

export default tempUserRouter;
