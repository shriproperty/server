import { Response } from 'express';

/**
 * Create an http only cookie
 */
export const httpOnlyCookie = (
	title: string,
	body: string | object,
	res: Response
) => {
	return res.cookie(title, body, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
	});
};
