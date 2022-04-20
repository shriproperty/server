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
	tempUserController.registerNewTempUser
);
tempUserRouter.get('/temp-users/all', tempUserController.getAllTempUsers);
tempUserRouter.get('/temp-users/verify', tempUserController.verifyTempUser);
tempUserRouter.patch(
	'/temp-users/update-calling-status/:id',
	processRequestBody(updateTempUserCallingStatusSchema.body),
	processRequestParams(updateTempUserCallingStatusSchema.params),
	tempUserController.updateTempUserCallingStatus
);
tempUserRouter.delete(
	'/temp-users/delete/:id',
	processRequestParams(deleteTempUserSchema.params),
	tempUserController.deleteTempUser
);

export default tempUserRouter;
