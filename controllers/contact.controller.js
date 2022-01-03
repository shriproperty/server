import Contact from '../models/contact.model.js';
import { validationResult } from 'express-validator';

/* ---------------------------------- create new ---------------------------------- */
export const createNew = async (req, res) => {
	try {
		// get input from user
		const { subject, name, email, phone, message } = req.body;

		// validate user input
		if (!subject || !name || !email || !phone || !message) {
			return res.status(400).json({
				success: false,
				message: 'Please fill all fields',
				data: {},
			});
		}
		// check errors from express-validator
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				message: errors.array()[0].msg,
				data: {},
			});
		}

		// check if user has already submitted a contact request
		const existingContact = await Contact.findOne({
			$or: [{ email }, { phone }],
		});

		if (existingContact) {
			return res.status(409).json({
				success: false,
				message:
					'You have already submitted a contact request wait until it is being processed',
				data: {},
			});
		}

		// create new contact request
		const newContact = await Contact.create({
			subject,
			name,
			email,
			phone,
			message,
		});

		res.status(201).json({
			success: true,
			message: 'Contact request submitted successfully',
			data: newContact,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ---------------------------- get all contacts ---------------------------- */
export const getAll = async (req, res) => {
	try {
		const contacts = await Contact.find({});

		res.status(200).json({
			success: true,
			message: 'All contacts fetched successfully',
			data: contacts,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};
