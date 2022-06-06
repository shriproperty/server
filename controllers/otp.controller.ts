import { Otp, OtpModel } from '../models/otp.model';
import { sendEmail } from '../helpers/email.helper';
import logger from '../helpers/logger.helper';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/* ------------------------------- ANCHOR send otp ------------------------------- */
export const sendOtpHandler = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		// get all otps which match same email and than delete them
		const existingOtps = await OtpModel.find({ email });

		if (existingOtps.length > 0) {
			await OtpModel.deleteMany({ email });
		}

		// generate otp
		const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		// send to email
		await sendEmail(email, 'OTP for Shri Property', `Your OTP is: ${otp}`);

		// save to db
		const saveOtpToDB = await OtpModel.create({
			email,
			otp,
		});

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'Otp sent successfully',
			data: saveOtpToDB,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_ACCEPTABLE).json({
			success: false,
			message: 'Please enter valid Email',
			data: {},
		});
	}
};

/* ------------------------------- ANCHOR verify otp ------------------------------- */
export const verifyOtpHandler = async (req: Request, res: Response) => {
	try {
		const { otp, email } = req.body;

		const otpFromDB = await OtpModel.findOne({ email });

		if (otpFromDB?.otp !== otp) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: 'Please enter valid otp',
				data: {},
			});
		}

		// delete otp from db
		await OtpModel.deleteOne({ email });

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Otp verified successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Your OTP is expired',
			data: {},
		});
	}
};
