'use strict';

import TempUser from '../models/tempUser.model.js';

import { validationResult } from 'express-validator';
import { generateJWT, verifyJWT } from '../helpers/jwt.helper.js';

/* --------------------------------- create --------------------------------- */
export const createNew = async (req, res) => {
	try {
		const { name, email, phone } = req.body;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				message: errors.array()[0].msg,
				data: {},
			});
		}

		const user = await TempUser.create({ name, email, phone });

		const token = generateJWT({ id: user._id }, '24h');

		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: user,
			token,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ------------------------------ get all users ----------------------------- */
export const getAllUsers = async (req, res) => {
	try {
		const users = await TempUser.find();

		return res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ------------------------------- update user calling status for admin ------------------------------ */
export const updateUserCallingStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { callingStatus, callAgainDate, talkProgress } = req.body;

		// validate user input
		if (!callingStatus) {
			return res.status(400).json({
				success: false,
				message: 'Please fill all fields',
				data: {},
			});
		}

		// check if 'callingStatus' is 'Call Again' but 'callAgainDate' is null or talkProgress is null
		if (
			callingStatus === 'Call Again' &&
			(!callAgainDate || !talkProgress)
		) {
			return res.status(400).json({
				success: false,
				message:
					'"callAgainDate", "talkProgress" are required for "Call Again"',
				data: {},
			});
		}

		// check if 'callingStatus' is not 'Call Again' but 'callAgainDate' is not null or 'talkProgress' is not null
		if (callingStatus !== 'Call Again' && (callAgainDate || talkProgress)) {
			return res.status(400).json({
				success: false,
				message:
					'You can only assign "callAgainDate", "talkProgress" when calling status is "Call Again"',
				data: {},
			});
		}

		// update user calling status and date
		const updatedUser = await TempUser.findByIdAndUpdate(
			id,
			{
				callingStatus,
				callAgainDate,
				talkProgress,
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: updatedUser,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: 'User not found invalid id',
			data: {},
		});
	}
};

/* ------------------------------- verify user ------------------------------ */
export const verifyUser = (req, res) => {
	try {
		const { token } = req.body;

		const verifiedUser = verifyJWT(token);

		if (!verifiedUser) {
			return res.status(401).json({
				success: false,
				message: 'Invalid token',
				data: {},
			});
		}

		res.status(200).json({
			success: true,
			message: 'User verified successfully',
			data: {},
		});
	} catch (err) {
		res.status(401).json({
			success: false,
			message: 'Invalid token',
			data: {},
		});
	}
};
