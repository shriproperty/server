import { Response } from 'express';

/**
 * Create an http only cookie
 * @param {string} title title of cookie
 * @param {string} body body of cookie
 * @param {string} res response object from controller
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
