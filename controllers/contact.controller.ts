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
export async function createNewContactHandler(
	req: Request<{}, {}, CreateContactBody>,
	res: Response
) {
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
}

/* ---------------------------- ANCHOR get all contacts ---------------------------- */
export async function getAllContactsHandler(req: Request, res: Response) {
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
}

/* ------------------------------ ANCHOR update status ----------------------------- */
export async function updateContactStatus(
	req: Request<UpdateContactStatusParams, {}, UpdateContactStatusBody>,
	res: Response
) {
	try {
		const { id } = req.params;
		const { status } = req.body;

		// update contact status
		const updatedContact = await ContactModel.findByIdAndUpdate(
			id,
			{
				status,
			},
			{ new: true, runValidators: true }
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Contact status updated successfully',
			data: updatedContact,
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
}

// /* ----------------------------- ANCHOR delete contact ---------------------------- */
// export const deleteContact = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const deletedContact = await Contact.findByIdAndDelete(id);

// 		res.status(200).json({
// 			success: true,
// 			message: 'Contact deleted successfully',
// 			data: deletedContact,
// 		});
// 	} catch (err) {
// 		logger.error(err);

// 		res.status(404).json({
// 			success: false,
// 			message: 'Contact not found Invalid Id',
// 			data: {},
// 		});
// 	}
// };
