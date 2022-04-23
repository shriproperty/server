import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { createNew } from '../controllers/contact.controller';
import { createContactSchema } from '../schemas/contact.schema';

const contactRouter = Router();

contactRouter.post(
	'/contacts/add',
	processRequestBody(createContactSchema.body),
	createNew
);

// contactRouter.get('/contacts/all', contactController.getAll);

// contactRouter.patch(
// 	'/contacts/update-status/:id',
// 	contactController.updateStatus
// );

// contactRouter.delete('/contacts/delete/:id', contactController.deleteContact);

export default contactRouter;
