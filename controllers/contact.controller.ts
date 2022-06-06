import { ContactModel } from '../models/contact.model';
import logger from '../helpers/logger.helper';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
	CreateContactBody,
	UpdateContactStatusBody,
	UpdateContactStatusParams,
} from '../schemas/contact.schema';

/* ---------------------------------- ANCHOR create new ---------------------------------- */
export const createNewContactHandler = async (
	req: Request<{}, {}, CreateContactBody>,
	res: Response
) => {
	try {
		// get input from user
		const { subject, name, email, phone, message } = req.body;

		// check if user has already submitted a contact request
		const existingContacts = await ContactModel.find({
			$or: [{ email }, { phone }],
		});

		if (existingContacts.length > 3) {
			return res.status(StatusCodes.CONFLICT).json({
				success: false,
				message:
					'You have already submitted 3 contacts request wait until they are being processed',
				data: {},
			});
		}

		// create new contact request
		const newContact = await ContactModel.create({
			subject,
			name,
			email,
			phone,
			message,
		});

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Contact request submitted successfully',
			data: newContact,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ---------------------------- ANCHOR get all contacts ---------------------------- */
export const getAllContactsHandler = async (req: Request, res: Response) => {
	try {
		const contacts = await ContactModel.find();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'All contacts fetched successfully',
			data: contacts,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* ------------------------------ ANCHOR update status ----------------------------- */
export const updateContactStatus = async (
	req: Request<UpdateContactStatusParams, {}, UpdateContactStatusBody>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const contact = await ContactModel.findById(id);

		if (!contact) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'contact not found',
				data: {},
			});
		}

		contact.status = status;

		// update contact status
		contact.save();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Contact status updated successfully',
			data: contact,
		});
	} catch (err: any) {
		logger.error(err);

		if (err.errors.status.name === 'ValidatorError') {
			return res.status(StatusCodes.NOT_ACCEPTABLE).json({
				success: false,
				message:
					'Status can be one of the following: Pending, In Progress, Completed',
				data: err,
			});
		}

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Contact not found Invalid Id',
			data: {},
		});
	}
};

/* ----------------------------- ANCHOR delete contact ---------------------------- */
export const deleteContactHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedContact = await ContactModel.findByIdAndDelete(id);

		if (!deletedContact) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'contact not found',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Contact deleted successfully',
			data: deletedContact,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Contact not found Invalid Id',
			data: {},
		});
	}
};
