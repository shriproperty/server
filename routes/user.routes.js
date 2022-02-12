'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

const validationRules = [
	check('name', 'name must be between 3 to 15 chracters')
		.exists()
		.isLength({ min: 3, max: 15 }),
	check('email', 'please enter a valid email').exists().isEmail(),
	check('phone', 'please enter a valid phone number')
		.exists()
		.isMobilePhone('en-IN'),
];

userRouter.post('/users/add', validationRules, userController.createNew);
userRouter.get('/users/all', userController.getAllUsers);
userRouter.patch(
	'/users/update-calling-status/:id',
	userController.updateUserCallingStatus
);

export default userRouter;
