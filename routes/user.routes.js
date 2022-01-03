import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/users/all', userController.getAllUsers);
userRouter.patch(
	'/users/update-calling-status/:id',
	userController.updateUserCallingStatus
);

export default userRouter;
