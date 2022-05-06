import { Router } from 'express';

import {
	processRequestBody,
	processRequestParams,
	processRequestQuery,
} from 'zod-express-middleware';

import {
	createPropertyHandler,
	getAllPropertiesHandler,
	getSinglePropertyHandler,
	updatePropertyHandler,
} from '../controllers/property.controller';

import fileUpload from '../middlewares/fileUpload.middleware';

import {
	createPropertySchema,
	getAllPropertiesSchema,
	getSinglePropertySchema,
	updatePropertySchema,
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

propertyRouter.get(
	'/properties/single/:id',
	processRequestParams(getSinglePropertySchema.params),
	getSinglePropertyHandler
);

propertyRouter.patch(
	'/properties/update/:id',
	processRequestBody(updatePropertySchema.body),
	processRequestParams(updatePropertySchema.params),
	fileUpload,
	updatePropertyHandler
);

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
