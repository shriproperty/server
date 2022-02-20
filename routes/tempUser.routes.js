'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import * as tempUserController from '../controllers/tempUser.controller.js';

const tempUserRouter = Router();

const validationRules = [
	check('name', 'name must be between 3 to 15 characters')
		.exists()
		.isLength({ min: 3, max: 15 }),
	check('email', 'please enter a valid email').exists().isEmail(),
	check('phone', 'please enter a valid phone number')
		.exists()
		.isMobilePhone('en-IN'),
];

tempUserRouter.post(
	'/temp-users/add',
	validationRules,
	tempUserController.createNew
);
tempUserRouter.post('/temp-users/verify', tempUserController.verifyUser);
tempUserRouter.get('/temp-users/all', tempUserController.getAllUsers);
tempUserRouter.patch(
	'/temp-users/update-calling-status/:id',
	tempUserController.updateUserCallingStatus
);

export default tempUserRouter;
