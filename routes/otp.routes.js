'use strict';

import { Router } from 'express';
import * as otpController from '../controllers/otp.controller.js';

const otpRouter = Router();

otpRouter.post('/otp/send', otpController.sendOtp);

export default otpRouter;