import jwt, { JwtPayload } from 'jsonwebtoken';

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
export const verifyJWT = (token: string): string | JwtPayload | null => {
	try {
		const verified = jwt.verify(token, JWT_SECRET);

		return verified;
	} catch (e) {
		return null;
	}
};
