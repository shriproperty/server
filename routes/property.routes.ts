import { Router } from 'express';

import {
	processRequestBody,
	processRequestParams,
	processRequestQuery,
} from 'zod-express-middleware';

import {
	createPropertyHandler,
	deletePropertyHandler,
	getAllPropertiesHandler,
	getSinglePropertyHandler,
	updatePropertyHandler,
} from '../controllers/property.controller';

import fileUpload from '../middlewares/fileUpload.middleware';

import {
	createPropertySchema,
	deletePropertySchema,
	getAllPropertiesSchema,
	getSinglePropertySchema,
	updatePropertySchema,
} from '../schemas/property.schema';

const propertyRouter = Router();

propertyRouter.post('/properties/add', fileUpload, createPropertyHandler);

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
	fileUpload,
	updatePropertyHandler
);

// propertyRouter.put(
// 	'/properties/move-property-to-listings/:id',
// 	propertyController.movePropertyToListings
// );
propertyRouter.delete(
	'/properties/delete/:id',
	processRequestParams(deletePropertySchema.params),
	deletePropertyHandler
);
// propertyRouter.delete(
// 	'/properties/delete-file/:id/:type/:key',
// 	propertyController.deleteFile
// );

export default propertyRouter;
