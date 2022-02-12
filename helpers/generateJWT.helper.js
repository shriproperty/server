'use strict';

import { default as jwt } from 'jsonwebtoken';

const generateJWT = user => {
	return jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_SECRET
	);
};

export default generateJWT;
