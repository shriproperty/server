import { config } from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../helpers/logger.helper';

config();

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Generate JWT token
 * @param {string | Buffer | object} body body of token
 * @param {expire | undefined} expire after what time token should expire automatically
 */
export const generateJWT = (
	body: string | Buffer | object,
	expire?: string
): string => {
	if (expire) {
		return jwt.sign(body, JWT_SECRET, {
			expiresIn: expire,
		});
	} else {
		return jwt.sign(body, JWT_SECRET);
	}
};

/**
 * Verify JWT token
 * @param {string} token token to verify
 */
export const verifyJWT = (token: string): JWT | null => {
	try {
		const verified = jwt.verify(token, JWT_SECRET) as JWT;

		return verified;
	} catch (e) {
		logger.error(e);

		return null;
	}
};
