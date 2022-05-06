import { Router } from 'express';

import {
	processRequestBody,
	processRequestQuery,
} from 'zod-express-middleware';

import {
	createPropertyHandler,
	getAllPropertiesHandler,
	getSinglePropertyHandler,
} from '../controllers/property.controller';

import fileUpload from '../middlewares/fileUpload.middleware';

import {
	createPropertySchema,
	getAllPropertiesSchema,
} from '../schemas/property.schema';

const propertyRouter = Router();

propertyRouter.post(
	'/properties/add',
	processRequestBody(createPropertySchema.body),
	fileUpload,
	createPropertyHandler
);

propertyRouter.get(
	'/properties/all',
	processRequestQuery(getAllPropertiesSchema.query),
	getAllPropertiesHandler
);

propertyRouter.get('/properties/single/:id', getSinglePropertyHandler);
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
