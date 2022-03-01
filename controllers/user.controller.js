import { decodeJWT } from '../helpers/jwt.helper.js';
import User from '../models/user.model.js';
import logger from '../helpers/logger.helper.js';

/* ------------------------- SECTION get single user ------------------------ */

export const getSingleUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { listings, properties } = req.query;

		// ANCHOR populate listings
		if (listings === 'true' && properties === 'false') {
			const user = await User.findById(id).populate('listings');

			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User not found',
					data: {},
				});
			}
			
			return res.status(200).json({
				success: true,
				message: 'User fetched successfully',
				data: user,
			});
		}

		// ANCHOR populate properties
		if (listings === 'false' && properties === 'true') {
			const user = await User.findById(id).populate('properties');

			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User not found',
					data: {},
				});
			}

			return res.status(200).json({
				success: true,
				message: 'User fetched successfully',
				data: user,
			});
		}

		// ANCHOR populate both listings and properties
		if (listings === 'true' && properties === 'true') {
			const user = await User.findById(id)
				.populate('listings')
				.populate('properties');

			if (!user) {
				return res.status(404).json({
					success: false,
					message: 'User not found',
					data: {},
				});
			}

			return res.status(200).json({
				success: true,
				message: 'User fetched successfully',
				data: user,
			});
		}

		// ANCHOR populate neither listings nor properties
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
				data: {},
			});
		}

		res.status(200).json({
			success: true,
			message: 'User fetched successfully',
			data: user,
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
			data: {},
		});
	}
};

/* -------------------------- !SECTION get single user end -------------------------- */

/* --------------------------------- SECTION decode --------------------------------- */
export const decode = async (req, res) => {
	const id = await decodeJWT(req.cookies.token);

	res.status(200).json({
		success: true,
		message: 'User ID',
		data: id,
	});
};

/* ----------------------------- !SECTION decode ---------------------------- */
