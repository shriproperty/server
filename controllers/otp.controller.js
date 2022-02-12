'use strict';

import Otp from '../models/otp.model.js';
import { sendSms } from '../helpers/sns.helper.js';

/* ------------------------------- send otp ------------------------------- */
export const sendOtp = async (req, res) => {
	try {
		const { phone } = req.query;

		// generate otp
		const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		const responseFromAws = await sendSms(`Your OTP is ${otp}`, phone);

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
			message: 'Internal Server Error',
			data: {},
		});
	}
};
