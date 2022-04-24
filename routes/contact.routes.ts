import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import {
	createNewContactHandler,
	getAllContactsHandler,
} from '../controllers/contact.controller';
import { createContactSchema } from '../schemas/contact.schema';

const contactRouter = Router();

contactRouter.post(
	'/contacts/add',
	processRequestBody(createContactSchema.body),
	createNewContactHandler
);

contactRouter.get('/contacts/all', getAllContactsHandler);

// contactRouter.patch(
// 	'/contacts/update-status/:id',
// 	contactController.updateStatus
// );

// contactRouter.delete('/contacts/delete/:id', contactController.deleteContact);

export default contactRouter;
