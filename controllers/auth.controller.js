'use strict';

import User from '../models/user.model.js';
import { genSalt, hash, compare } from 'bcrypt';
import { validationResult } from 'express-validator';
import generateJWT from '../helpers/generateJWT.helper.js';

/* --------------------------------- signup --------------------------------- */
export const signup = async (req, res) => {
	try {
		const { name, email, phone, password, cpassword } = req.body;

		// validate user input
		if (!name || !email || !phone || !password || !cpassword) {
			return res.status(400).json({
				success: false,
				message: 'Please enter all fields',
				data: {},
			});
		}

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				message: errors.array()[0].msg,
				data: {},
			});
		}

		// check if user already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { phone }],
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: 'User already exists',
				data: {},
			});
		}

		//check if password mathch with confirm password
		if (password !== cpassword) {
			return res.status(400).json({
				success: false,
				message: 'Password does not match with confirm password',
				data: {},
			});
		}

		// hash password
		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);

		// create user
		const user = await User.create({
			name,
			email,
			phone,
			password: hashedPassword,
		});

		// generate JWT
		const token = generateJWT(user);

		return res.status(201).json({
			success: true,
			message: 'User created successfully',
			token,
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ---------------------------------- login --------------------------------- */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// validate user input
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Please enter all fields',
				data: {},
			});
		}

		// check if user  exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
				data: {},
			});
		}

		// check if password is correct
		const isPasswordCorrect = await compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({
				success: false,
				message: 'Password is incorrect',
				data: {},
			});
		}

		// generate JWT
		const token = generateJWT(user);

		return res.status(200).json({
			success: true,
			message: 'User logged in successfully',
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
