import { Router } from 'express';
import * as propertyController from '../controllers/property.controller.js';

const productRouter = Router();

productRouter.post('/products/add', propertyController.createProduct);

export default productRouter;
