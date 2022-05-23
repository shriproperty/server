import { Router } from 'express';
import { createListingHandler, getAllListingsHandler } from '../controllers/listing.controller';
import fileUpload from '../middlewares/fileUpload.middleware';
import requireLoggedIn from '../middlewares/requireLoggedIn.middleware';

const listingRouter = Router();

listingRouter.post('/listings/add', requireLoggedIn, fileUpload, createListingHandler);
listingRouter.get('/listings/all', getAllListingsHandler);
// listingRouter.get('/listings/single/:id', listingController.getSingle);
// listingRouter.patch('/listings/update/:id', listingController.update);
// listingRouter.delete('/listings/delete/:id', listingController.deleteListing);
// listingRouter.put('/listings/approve/:id', listingController.approveListing);
// listingRouter.delete(
// 	'/listings/delete-file/:id/:type/:key',
// 	listingController.deleteFile
// );

export default listingRouter;
