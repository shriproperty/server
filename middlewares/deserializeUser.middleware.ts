import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../helpers/jwt.helper';

/**
 * This function will be called before every route
 * and will deserialize the user from the cookie token
 * and attach it to the req.locals
 */
function deserializeUser(req: Request, res: Response, next: NextFunction) {
	let decoded;

	if (req.cookies.token) {
		decoded = verifyJWT(req.cookies.token);
	}

	if (!decoded) return next();

	res.locals.user = decoded.id;

	return next();
}

export default deserializeUser;
