import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { genSalt, hash, compare } from 'bcrypt';
import { generateJWT, verifyJWT } from '../helpers/jwt.helper';
import { httpOnlyCookie } from '../helpers/cookie.helper';
import logger from '../helpers/logger.helper';
import { SignupBody } from '../schemas/auth.schema';
import { StatusCodes } from 'http-status-codes';

/* --------------------------------- ANCHOR Signup --------------------------------- */
export const signup = async (
	req: Request<{}, {}, SignupBody>,
	res: Response
) => {
	try {
		const { name, email, phone, password } = req.body;

		// create user
		const newUser = await UserModel.create({
			name,
			email,
			phone,
			password,
		});

		// generate jwt token
		const token = generateJWT({
			id: newUser._id,
		});

		httpOnlyCookie('token', token, res);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'User created successfully',
			data: {
				user: newUser,
			},
		});
	} catch (err: any) {
		logger.error(err);

		if (err.code === 11000) {
			return res.status(StatusCodes.CONFLICT).json({
				success: false,
				message: 'user already exists',
				data: {},
			});
		}

		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

// /* ---------------------------------- ANCHOR login --------------------------------- */
// export const login = async (req, res) => {
// 	try {
// 		const { email, password } = req.body;

// 		// validate body
// 		const errors = validationResult(req).array();

// 		if (errors.length > 0) {
// 			return res.status(400).json({
// 				success: false,
// 				message: errors[0].msg,
// 				data: {},
// 			});
// 		}

// 		// check if user exists
// 		const user = await User.findOne({ email });

// 		if (!user) {
// 			return res.status(404).json({
// 				success: false,
// 				message: 'User not found please check if your email is correct',
// 				data: {},
// 			});
// 		}

// 		// check if password is correct
// 		const isPasswordCorrect = await compare(password, user.password);

// 		if (!isPasswordCorrect) {
// 			return res.status(401).json({
// 				success: false,
// 				message: 'Password is incorrect',
// 				data: {},
// 			});
// 		}

// 		// generate jwt token
// 		const token = generateJWT({ id: user._id });

// 		return res
// 			.status(200)
// 			.cookie(httpOnlyCookie('token', token, res))
// 			.json({
// 				success: true,
// 				message: 'User logged in successfully',
// 				data: user,
// 			});
// 	} catch (err) {
// 		logger.error(err);

// 		res.status(500).json({
// 			success: false,
// 			message: 'Please check your email or password',
// 			data: {},
// 		});
// 	}
// };

// /* ---------------------------------- ANCHOR logout --------------------------------- */

// export const logout = (req, res) => {
// 	res.clearCookie('token').status(200).json({
// 		success: true,
// 		message: 'User logged out successfully',
// 		data: {},
// 	});
// };

// /* ------------------------------ ANCHOR is logged in ------------------------------ */
// export const isLoggedIn = async (req, res) => {
// 	try {
// 		const { token } = req.cookies;

// 		const isLoggedIn = verifyJWT(token);

// 		if (!isLoggedIn) {
// 			return res.status(401).json({
// 				success: false,
// 				message: 'User is not logged in',
// 				data: {},
// 			});
// 		}

// 		const decodedId = await decodeJWT(token);

// 		const user = await User.findById(decodedId.id);

// 		res.status(200).json({
// 			success: true,
// 			message: 'User is logged in',
// 			data: user,
// 		});
// 	} catch (err) {
// 		logger.error(err);

// 		res.status(401).json({
// 			success: false,
// 			message: 'User is not logged in',
// 			data: {},
// 		});
// 	}
// };

// /* -------------------------- ANCHOR reset password ------------------------- */
// export const resetPassword = async (req, res) => {
// 	try {
// 		const { email, newPassword } = req.body;

// 		// validate body
// 		const errors = validationResult(req).array();

// 		if (errors.length > 0) {
// 			return res.status(400).json({
// 				success: false,
// 				message: errors[0].msg,
// 				data: {},
// 			});
// 		}

// 		// check if user exists
// 		const user = await User.findOne({ email });

// 		if (!user) {
// 			return res.status(404).json({
// 				success: false,
// 				message: 'User not found please check if your email is correct',
// 				data: {},
// 			});
// 		}

// 		// hash password
// 		const salt = await genSalt(10);

// 		const hashedPassword = await hash(newPassword, salt);

// 		// update password
// 		const updatedUser = await User.findOneAndUpdate(
// 			{ email },
// 			{ password: hashedPassword },
// 			{ new: true }
// 		);

// 		res.status(200).json({
// 			success: true,
// 			message: 'Password updated successfully',
// 			data: updatedUser,
// 		});
// 	} catch (err) {
// 		logger.error(err);
// 		res.status(500).json({
// 			success: false,
// 			message: 'Internal Server Error',
// 			data: {},
// 		});
// 	}
// };
