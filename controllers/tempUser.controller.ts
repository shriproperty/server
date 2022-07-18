import { Request, Response } from 'express';
import { TempUser, TempUserModel } from '../models/tempUser.model';
import {
	DeleteTempUserParams,
	RegisterNewBody,
	UpdateTempUserCallingStatusBody,
	UpdateTempUserCallingStatusParams,
} from '../schemas/tempUser.schema';

import { generateJWT, verifyJWT } from '../helpers/jwt.helper';
import { httpOnlyCookie } from '../helpers/cookie.helper';
import logger from '../helpers/logger.helper';
import { StatusCodes } from 'http-status-codes';

/* --------------------------------- ANCHOR create --------------------------------- */
export const registerNewTempUserHandler = async (
	req: Request<{}, {}, RegisterNewBody>,
	res: Response
) => {
	try {
		const { name, email, phone } = req.body;

		const user = await TempUserModel.create({ name, email, phone });

		const token = generateJWT({ id: user._id }, '24h');

		httpOnlyCookie('tempUserToken', token, res);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'User created successfully',
			data: user,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ------------------------------ ANCHOR get all users ----------------------------- */
export const getAllTempUsersHandler = async (req: Request, res: Response) => {
	try {
		const users = await TempUserModel.find();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		logger.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ------------------------------- ANCHOR update user calling status for admin ------------------------------ */
export const updateTempUserCallingStatusHandler = async (
	req: Request<
		UpdateTempUserCallingStatusParams,
		{},
		UpdateTempUserCallingStatusBody
	>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { callingStatus, callAgainDate, talkProgress } = req.body;

		// check if 'callingStatus' is 'Call Again' but 'callAgainDate' is null or `talkProgress` is null
		if (
			callingStatus === 'Call Again' &&
			(!callAgainDate || !talkProgress)
		) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message:
					'`callAgainDate`, `talkProgress` are required for `Call Again`',
				data: {},
			});
		}

		// check if 'callingStatus' is not 'Call Again' but 'callAgainDate' is not null or 'talkProgress' is not null
		if (callingStatus !== 'Call Again' && (callAgainDate || talkProgress)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message:
					'You can only assign `callAgainDate`, `talkProgress` when calling status is `Call Again`',
				data: {},
			});
		}

		// update user calling status and date
		const updatedUser = await TempUserModel.findByIdAndUpdate(
			id,
			{
				callingStatus,
				callAgainDate,
				talkProgress,
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'No User Found',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'User updated successfully',
			data: updatedUser,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'User not found invalid id',
			data: {},
		});
	}
};

/* --------------------------- ANCHOR delete user --------------------------- */
export const deleteTempUserHandler = async (
	req: Request<DeleteTempUserParams, {}, {}>,
	res: Response
) => {
	try {
		const { id } = req.params;

		const deletedUser = await TempUserModel.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User Not Found',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'User deleted successfully',
			data: deletedUser,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ------------------------------- ANCHOR verify user ------------------------------ */
export const verifyTempUserHandler = (req: Request, res: Response) => {
	try {
		const { tempUserToken, token } = req.cookies;

		// use this to verify if user is logged in
		if (token) {
			const verifiedToken = verifyJWT(token);

			if (!verifiedToken) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					success: false,
					message: 'Invalid token',
					data: {},
				});
			}

			return res.status(StatusCodes.OK).json({
				success: true,
				message: 'User verified successfully',
				data: {},
			});
		}

		// use this to verify if user is temp user
		const verifiedUser = verifyJWT(tempUserToken);

		if (!verifiedUser) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				success: false,
				message: 'Invalid token',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'User verified successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.UNAUTHORIZED).json({
			success: false,
			message: 'Invalid token',
			data: {},
		});
	}
};
