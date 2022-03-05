'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

const signupValidationChecks = [
	check('name', 'This username must be at least 3+ character long')
		.exists()
		.isLength({ min: 3 }),
	check('email', 'Please enter a valid email address').exists().isEmail(),
	check('phone', 'Please enter a valid phone number')
		.exists()
		.isMobilePhone('en-IN'),
	check('password', 'Please enter a strong password').exists(),
];

const loginValidationChecks = [
	check('email', 'Please enter a valid email address').exists().isEmail(),
	check('password', 'Please enter your password').exists(),
];

const resetPasswordChecks = [
	check('email', 'Please enter a valid email address').exists().isEmail(),
	check('newPassword', 'Please enter a strong password').exists(),
];

authRouter.post('/auth/signup', signupValidationChecks, authController.signup);
authRouter.post('/auth/login', loginValidationChecks, authController.login);
authRouter.get('/auth/is-logged-in', authController.isLoggedIn);
authRouter.get('/auth/logout', authController.logout);
authRouter.patch(
	'/auth/reset-password',
	resetPasswordChecks,
	authController.resetPassword
);

export default authRouter;
