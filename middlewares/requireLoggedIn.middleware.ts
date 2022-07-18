import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * this function will check if the user is logged in or not
 * and send error if user is not logged in
 */
function requireLoggedIn(req: Request, res: Response, next: NextFunction) {
	const user = res.locals.user;

	if (!user) return res.sendStatus(StatusCodes.FORBIDDEN);

	return next();
}

export default requireLoggedIn;
