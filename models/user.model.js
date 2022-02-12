'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	callingStatus: {
		type: String,
		required: true,
		default: 'Pending',
		enum: ['Pending', 'Rejected', 'Call Again', 'Done'],
	},
	callAgainDate: { type: String, required: false, default: null },
	talkProgress: { type: String, required: false, default: null },
});

const User = mongoose.model('User', userSchema);
export default User;
