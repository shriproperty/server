'use strict';

import Otp from '../models/otp.model.js';
import { sendSms } from '../helpers/sns.helper.js';

/* ------------------------------- send otp ------------------------------- */
export const sendOtp = async (req, res) => {
	try {
		const { phone } = req.body;

		// generate otp
		const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		await sendSms(`Your OTP is ${otp}`, phone);

		const saveOtpToDB = await Otp.create({
			phone,
			otp,
		});

		res.status(201).json({
			success: true,
			message: 'Otp sent successfully',
			data: saveOtpToDB,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Please try again with valid phone number',
			data: {},
		});
	}
};

/* ------------------------------- verify otp ------------------------------- */
export const verifyOtp = async (req, res) => {
	try {
		const { otp, phone } = req.body;

		const phoneFromDb = await Otp.findOne({ phone: phone });

		if (phoneFromDb.otp !== otp) {
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
		res.status(400).json({
			success: false,
			message: 'Your OTP is expired',
			data: {},
		});
	}
};
