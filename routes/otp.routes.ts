import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import {
	sendOtpHandler,
	verifyOtpHandler,
} from '../controllers/otp.controller';
import { sendOtpSchema, verifyOtpSchema } from '../schemas/otp.schema';

const otpRouter = Router();

otpRouter.post(
	'/otp/send',
	processRequestBody(sendOtpSchema.body),
	sendOtpHandler
);
otpRouter.post(
	'/otp/verify',
	processRequestBody(verifyOtpSchema.body),
	verifyOtpHandler
);

export default otpRouter;
