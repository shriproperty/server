'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

const validationChecks = [
	check('name', 'This username must be at least 3+ character long')
		.exists()
		.isLength({ min: 3 }),
	check('email', 'Please enter a valid email address').exists().isEmail(),
	check('phone', 'Please enter a valid phone number')
		.exists()
		.isMobilePhone('en-IN'),
	check('password', 'Please enter a strong password')
		.exists()
		.isStrongPassword(),
];

authRouter.post('/auth/signup', validationChecks, authController.signup);
// authRouter.post('/auth/login', authController.login);

export default authRouter;
