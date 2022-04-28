import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';

import { createPropertyHandler } from '../controllers/property.controller';
import fileUpload from '../middlewares/fileUpload.middleware';
import { createPropertySchema } from '../schemas/property.schema';

const propertyRouter = Router();

propertyRouter.post(
	'/properties/add',
	processRequestBody(createPropertySchema.body),
	fileUpload,
	createPropertyHandler
);
// propertyRouter.get('/properties/all', propertyController.getAll);
// propertyRouter.get('/properties/single/:id', propertyController.getSingle);
// propertyRouter.patch('/properties/update/:id', propertyController.update);
// propertyRouter.put(
// 	'/properties/move-property-to-listings/:id',
// 	propertyController.movePropertyToListings
// );
// propertyRouter.delete(
// 	'/properties/delete/:id',
// 	propertyController.deleteProperty
// );
// propertyRouter.delete(
// 	'/properties/delete-file/:id/:type/:key',
// 	propertyController.deleteFile
// );

export default propertyRouter;
