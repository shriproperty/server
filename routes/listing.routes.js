import { Router } from 'express';
import * as listingController from '../controllers/listing.controller.js';

const listingRouter = Router();

listingRouter.post('/listings/add', listingController.addNewListing);
listingRouter.get('/listings/all', listingController.getAll);
listingRouter.get('/listings/single/:id', listingController.getSingle);
listingRouter.patch('/listings/update/:id', listingController.update);
listingRouter.delete('/listings/delete/:id', listingController.deleteListing);
listingRouter.put('/listings/approve/:id', listingController.approveListing);
listingRouter.delete(
	'/listings/delete-file/:id/:type/:key',
	listingController.deleteFile
);

export default listingRouter;
