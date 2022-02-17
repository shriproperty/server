'use strict';

import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
	email: { type: String, required: true },
	otp: { type: String, required: true },
	expireAt: { type: Date, default: Date.now, index: { expires: '2m' } },
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
