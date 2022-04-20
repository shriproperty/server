import { NextFunction, Request, Response } from 'express';

const apiAuth = (req: Request, res: Response, next: NextFunction) => {
	const apiKeyFromHeaders = req.headers['x-api-key'];

	if (apiKeyFromHeaders !== process.env.API_KEY) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
			data: {},
		});
	}

	next();
};

export default apiAuth;
