import { Router } from 'express';
import * as propertyController from '../controllers/property.controller.js';

const propertyRouter = Router();

propertyRouter.post('/propertys/add', propertyController.createProduct);
propertyRouter.get('/propertys/get-all', propertyController.getAll);

export default propertyRouter;
