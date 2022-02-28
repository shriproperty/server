'use strict';

import { default as jwt } from 'jsonwebtoken';

/**
 * Generate JWT token
 * @param {object} body Data to sign
 * @param {string} expire Time after which token will expire
 * @return {string} Signed token
 */
export const generateJWT = (body, expire) => {
	if (expire) {
		return jwt.sign(body, process.env.JWT_SECRET, {
			expiresIn: expire,
		});
	} else {
		return jwt.sign(body, process.env.JWT_SECRET);
	}
};

/**
 * Verify jwt token
 * @param {string} token Token to verify
 * @return {boolean} `True` if token is valid, `false` otherwise
 */
export const verifyJWT = token => {
	let isVerified;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				throw new Error(err);
			}

			isVerified = decoded;
		});
	}

	return isVerified;
};

/**
 * @param {string} token Token to verify
 * @return {object} Decoded token
 */
export const decodeJWT = token => {
	let decoded;

	const verified = verifyJWT(token);

	if (verified) {
		decoded = jwt.decode(token);
	}

	return decoded;
};
