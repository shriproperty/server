'use strict';

import { Router } from 'express';
import { check } from 'express-validator';
import * as contactController from '../controllers/contact.controller.js';

const validationRules = [
	check('subject', 'Subject must be in 100 characters')
		.exists()
		.isLength({ max: 100 }),
	check('name', 'This username must be at least 3+ character long')
		.exists()
		.isLength({ min: 3 }),
	check('email', 'Please enter a valid email address').exists().isEmail(),
	check('phone', 'Please enter a valid phone number')
		.exists()
		.isMobilePhone('en-IN'),
	check('message', 'Message cannot exceed 300 characters')
		.exists()
		.isLength({ max: 300 }),
];

const contactRouter = Router();

contactRouter.post(
	'/contacts/add',
	// validate user input using express-validator
	validationRules,
	contactController.createNew
);

contactRouter.get('/contacts/all', contactController.getAll);

contactRouter.patch(
	'/contacts/update-status/:id',
	contactController.updateStatus
);

contactRouter.delete('/contacts/delete/:id', contactController.deleteContact);

export default contactRouter;
