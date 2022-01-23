import { Router } from 'express';
import * as propertyController from '../controllers/property.controller.js';

const propertyRouter = Router();

propertyRouter.post('/properties/add', propertyController.createProduct);
propertyRouter.get('/properties/all', propertyController.getAll);
propertyRouter.patch('/properties/update/:id', propertyController.update);
propertyRouter.delete(
	'/properties/delete/:id',
	propertyController.deleteProperty
);

export default propertyRouter;
