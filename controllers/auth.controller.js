'use strict';

import User from '../models/user.model.js';
import { genSalt, hash } from 'bcrypt';
import { validationResult } from 'express-validator';
import { generateJWT } from '../helpers/jwt.helper.js';
import { httpOnlyCookie } from '../helpers/cookie.helper.js';

export const signup = async (req, res) => {
	try {
		const { name, email, phone, password, cpassword } = req.body;

		// validate body
		const errors = validationResult(req).array();

		if (errors.length > 0) {
			return res.status(400).json({
				success: false,
				message: errors[0].msg,
				data: {},
			});
		}

		// check if passwords match confirm password
		if (password !== cpassword) {
			return res.status(400).json({
				success: false,
				message: 'Password and Confirm Password do not match',
				data: {},
			});
		}

		// check if user already exists
		const existingUser = await User.findOne({ email, phone });

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: 'Email or Phone already taken',
				data: {},
			});
		}

		// hash password
		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);

		// create user
		const newUser = await User.create({
			name,
			email,
			phone,
			password: hashedPassword,
		});

		// generate jwt token
		const token = generateJWT({
			id: newUser._id,
		});

		return res
			.status(201)
			.cookie(httpOnlyCookie('token', token, res))
			.json({
				success: true,
				message: 'User created successfully',
				data: {
					user: newUser,
				},
			});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};
