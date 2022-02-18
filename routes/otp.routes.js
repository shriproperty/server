'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import * as otpController from '../controllers/otp.controller.js';

const otpRouter = Router();

const validationChecks = [
	check('email', 'please enter a valid email').exists().isEmail(),
];

otpRouter.post('/otp/send', validationChecks, otpController.sendOtp);
otpRouter.post('/otp/verify', validationChecks, otpController.verifyOtp);

export default otpRouter;
