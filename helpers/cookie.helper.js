/**
 * Create an http only cookie
 * @param {string} title Title of the cookie
 * @param {any} body Body of the cookie
 * @param {object} res Express response object
 * @return {object} Cookie object
 */
export const httpOnlyCookie = (title, body, res) => {
	return res.cookie(title, body, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
	});
};
