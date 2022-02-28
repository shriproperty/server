import { decodeJWT } from '../helpers/jwt.helper.js';

export const decode = async (req, res) => {
	const id = await decodeJWT(req.cookies.token);

	res.status(200).json({
		success: true,
		message: 'User ID',
		data: id,
	});
};
