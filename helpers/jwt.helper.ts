import { config } from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../helpers/logger.helper';

config();

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Generate JWT token
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
 * takes `token` and verify and decode it
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
