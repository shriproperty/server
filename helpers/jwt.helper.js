'use strict';

import { default as jwt } from 'jsonwebtoken';

/**
 * @param {object} body Data to sign
 * @param {string} expire Time after which token will expire
 * @return {string} Signed token
 */
export const generateJWT = (body, expire) => {
	return jwt.sign(body, process.env.JWT_SECRET, {
		expiresIn: expire ? expire : null,
	});
};

export const verifyJWT = token => {
	return jwt.verify(token, process.env.JWT_SECRET);
};
