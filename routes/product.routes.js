import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/products/add', productController.createProduct);

export default productRouter;
