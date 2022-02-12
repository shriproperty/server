'use strict';

import { default as jwt } from 'jsonwebtoken';

const generateJWT = body => {
	return jwt.sign(body, process.env.JWT_SECRET);
};

export default generateJWT;
