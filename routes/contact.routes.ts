import { Router } from 'express';
import {
	processRequestBody,
	processRequestParams,
} from 'zod-express-middleware';
import {
	createNewContactHandler,
	deleteContactHandler,
	getAllContactsHandler,
	updateContactStatus,
} from '../controllers/contact.controller';
import {
	createContactSchema,
	updateContactStatusSchema,
} from '../schemas/contact.schema';

const contactRouter = Router();

contactRouter.post(
	'/contacts/add',
	processRequestBody(createContactSchema.body),
	createNewContactHandler
);

contactRouter.get('/contacts/all', getAllContactsHandler);

contactRouter.patch(
	'/contacts/update/:id',
	processRequestParams(updateContactStatusSchema.params),
	processRequestBody(updateContactStatusSchema.body),
	updateContactStatus
);

contactRouter.delete('/contacts/delete/:id', deleteContactHandler);

export default contactRouter;
