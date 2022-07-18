import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const apiAuth = (req: Request, res: Response, next: NextFunction) => {
	const apiKeyFromHeaders = req.headers['x-api-key'];

	if (apiKeyFromHeaders !== process.env.API_KEY) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			success: false,
			message: 'Unauthorized',
			data: {},
		});
	}

	next();
};

export default apiAuth;
