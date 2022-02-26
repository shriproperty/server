'use strict';

import User from '../models/user.model.js';
import { genSalt, hash, compare } from 'bcrypt';
import { validationResult } from 'express-validator';
import { generateJWT, verifyJWT } from '../helpers/jwt.helper.js';
import { httpOnlyCookie } from '../helpers/cookie.helper.js';
import logger from '../helpers/logger.helper.js';

/* --------------------------------- ANCHOR Signup --------------------------------- */
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
		logger.error(err);

		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ---------------------------------- ANCHOR login --------------------------------- */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// validate body
		const errors = validationResult(req).array();

		if (errors.length > 0) {
			return res.status(400).json({
				success: false,
				message: errors[0].msg,
				data: {},
			});
		}

		// check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found please check if your email is correct',
				data: {},
			});
		}

		// check if password is correct
		const isPasswordCorrect = await compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				success: false,
				message: 'Password is incorrect',
				data: {},
			});
		}

		// generate jwt token
		const token = generateJWT({ id: user._id });

		return res
			.status(200)
			.cookie(httpOnlyCookie('token', token, res))
			.json({
				success: true,
				message: 'User logged in successfully',
				data: user,
			});
	} catch (err) {
		logger.error(err);

		res.status(500).json({
			success: false,
			message: 'Please check your email or password',
			data: {},
		});
	}
};

/* ------------------------------ ANCHOR is logged in ------------------------------ */
export const isLoggedIn = (req, res) => {
	try {
		const { token } = req.cookies;

		const isLoggedIn = verifyJWT(token);

		if (!isLoggedIn) {
			return res.status(401).json({
				success: false,
				message: 'User is not logged in',
				data: {},
			});
		}

		res.status(200).json({
			success: true,
			message: 'User is logged in',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		res.status(401).json({
			success: false,
			message: 'User is not logged in',
			data: {},
		});
	}
};
