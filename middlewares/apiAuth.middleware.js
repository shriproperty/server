'use strict';

const apiAuth = (req, res, next) => {
	const apiKeyFromHeaders = req.headers['x-api-key'];

	if (apiKeyFromHeaders !== process.env.API_KEY) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
			data: {},
		});
	}

	next();
};

export default apiAuth;
