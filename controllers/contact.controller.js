'use strict';

import Contact from '../models/contact.model.js';
import { validationResult } from 'express-validator';

/* ---------------------------------- create new ---------------------------------- */
export const createNew = async (req, res) => {
	try {
		// get input from user
		const { subject, name, email, phone, message } = req.body;

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

/* ------------------------------ update status ----------------------------- */
export const updateStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		// validate user input
		if (!status) {
			return res.status(400).json({
				success: false,
				message: 'Please fill all fields',
				data: {},
			});
		}

		// check if status is valid
		if (
			status !== 'Pending' &&
			status !== 'In Progress' &&
			status !== 'Completed'
		) {
			return res.status(400).json({
				success: false,
				message: 'Invalid status',
				data: {},
			});
		}

		// update contact status
		const updatedContact = await Contact.findByIdAndUpdate(
			id,
			{
				status,
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: 'Contact status updated successfully',
			data: updatedContact,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: 'Contact not found Invalid Id',
			data: {},
		});
	}
};

/* ----------------------------- delete contact ---------------------------- */
export const deleteContact = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedContact = await Contact.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: 'Contact deleted successfully',
			data: deletedContact,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: 'Contact not found Invalid Id',
			data: {},
		});
	}
};
