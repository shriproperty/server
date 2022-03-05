'use strict';

import { Router } from 'express';
import * as propertyController from '../controllers/property.controller.js';

const propertyRouter = Router();

propertyRouter.post('/properties/add', propertyController.createProperty);
propertyRouter.get('/properties/all', propertyController.getAll);
propertyRouter.get('/properties/single/:id', propertyController.getSingle);
propertyRouter.patch('/properties/update/:id', propertyController.update);
propertyRouter.put(
	'/properties/move-property-to-listings/:id',
	propertyController.movePropertyToListings
);
propertyRouter.delete(
	'/properties/delete/:id',
	propertyController.deleteProperty
);
propertyRouter.delete(
	'/properties/delete-file/:id/:type/:key',
	propertyController.deleteFile
);

export default propertyRouter;
