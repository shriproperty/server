import { UserModel } from '../models/user.model';
import logger from '../helpers/logger.helper';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
	GetSingleUserParams,
	GetSingleUserQuery,
} from '../schemas/user.schema';
import { ResetPasswordBody } from '../schemas/user.schema';

/* ---------------------------- SECTION get all users ---------------------------- */

export const getAllHandler = async (req: Request, res: Response) => {
	try {
		const users = await UserModel.find({});

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'All contacts fetched successfully',
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

/* -------------------------------- !SECTION Get all users end -------------------------------- */

/* ------------------------- SECTION get single user ------------------------ */

export const getSingleUserHandler = async (
	req: Request<GetSingleUserParams, {}, {}, GetSingleUserQuery>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { listings, properties } = req.query;

		let user;

		// ANCHOR populate both listings and properties
		if (listings && properties) {
			user = await UserModel.findById(id)
				.populate('listings')
				.populate('properties');
		} else if (listings) {
			user = await UserModel.findById(id).populate('listings');
		} else if (properties) {
			user = await UserModel.findById(id).populate('properties');
		} else {
			user = await UserModel.findById(id);
		}

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User not found',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'User fetched successfully',
			data: user,
		});
	} catch (err: any) {
		logger.error(err);

		if (err.path === '_id') {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User not found',
				data: {},
			});
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal server error',
			data: {},
		});
	}
};

/* -------------------------- !SECTION get single user end -------------------------- */

/* -------------------------- SECTION - reset password ------------------------- */
export const resetPasswordHandler = async (
	req: Request<{}, {}, ResetPasswordBody>,
	res: Response
) => {
	try {
		const { email, newPassword } = req.body;

		// check if user exists
		const user = await UserModel.findOne({ email });

		// NOTE: Password will be hashed in user.model.ts pre() decorator
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User not found please check if your email is correct',
				data: {},
			});
		}

		user.password = newPassword;

		await user.save();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Password updated successfully',
			data: {},
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

/* -------------------------------- !SECTION -------------------------------- */
