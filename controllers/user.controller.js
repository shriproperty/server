import User from '../models/user.model.js';

/* ------------------------------ get all users ----------------------------- */
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		return res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};
