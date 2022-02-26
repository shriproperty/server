'use strict';

import Otp from '../models/otp.model.js';
import { sendEmail } from '../helpers/email.helper.js';
import { validationResult } from 'express-validator';
import logger from '../helpers/logger.helper.js';

/* ------------------------------- ANCHOR send otp ------------------------------- */
export const sendOtp = async (req, res) => {
	try {
		const { email } = req.body;

		const errors = validationResult(req).array();

		if (errors.length > 0) {
			return res.status(400).json({
				success: false,
				message: errors[0].msg,
				data: {},
			});
		}

		// generate otp
		const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		// send to email
		await sendEmail(email, 'OTP for Shri Property', `Your OTP is: ${otp}`);

		// save to db
		const saveOtpToDB = await Otp.create({
			email,
			otp,
		});

		res.status(201).json({
			success: true,
			message: 'Otp sent successfully',
			data: saveOtpToDB,
		});
	} catch (err) {
		logger.error(err);

		res.status(500).json({
			success: false,
			message: 'Please enter valid Email',
			data: {},
		});
	}
};

/* ------------------------------- ANCHOR verify otp ------------------------------- */
export const verifyOtp = async (req, res) => {
	try {
		const { otp, email } = req.body;

		const errors = validationResult(req).array();

		if (errors.length > 0) {
			return res.status(400).json({
				success: false,
				message: errors[0].msg,
				data: {},
			});
		}

		const otpFromDB = await Otp.findOne({ email });

		if (otpFromDB.otp !== otp) {
			return res.status(400).json({
				success: false,
				message: 'Please enter valid otp',
				data: {},
			});
		}

		res.status(200).json({
			success: true,
			message: 'Otp verified successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		res.status(400).json({
			success: false,
			message: 'Your OTP is expired',
			data: {},
		});
	}
};
