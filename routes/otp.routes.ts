import { Router } from 'express';
import {
	sendOtpHandler,
	verifyOtpHandler,
} from '../controllers/otp.controller';

const otpRouter = Router();

otpRouter.post('/otp/send', sendOtpHandler);
otpRouter.post('/otp/verify', verifyOtpHandler);

export default otpRouter;
