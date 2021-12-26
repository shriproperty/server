import User from '../models/user.model.js';
import { genSalt, hash } from 'bcrypt';
import generateJWT from '../helpers/generateJWT.helper.js';

/* --------------------------------- signup --------------------------------- */
export const postSignup = async (req, res) => {
	try {
		const { name, email, phone, password, cpassword } = req.body;

		// validate user input
		if (!name || !email || !phone || !password || !cpassword) {
			return res.status(400).json({
				success: false,
				message: 'Please enter all fields',
				data: {},
			});
		}

		// check if user already exists
		const existingUser = await User.findOne({
			$or: [{ email }, { phone }],
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: 'User already exists',
				data: {},
			});
		}

		//check if password mathch with confirm password
		if (password !== cpassword) {
			return res.status(400).json({
				success: false,
				message: 'Password does not match with confirm password',
				data: {},
			});
		}

		// hash password
		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);

		// create user
		const user = await User.create({
			name,
			email,
			phone,
			password: hashedPassword,
		});

		// generate JWT
		const token = generateJWT(user);

		return res.status(201).json({
			success: true,
			message: 'User created successfully',
			token,
			data: user,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};
