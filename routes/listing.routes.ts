import { Router } from 'express';
import { processRequestParams } from 'zod-express-middleware';
import {
	createListingHandler,
	getAllListingsHandler,
	getSingleListingHandler,
	updateListingHandler,
} from '../controllers/listing.controller';
import fileUpload from '../middlewares/fileUpload.middleware';
import requireLoggedIn from '../middlewares/requireLoggedIn.middleware';
import { getSingleListingSchema } from '../schemas/listing.schema';

const listingRouter = Router();

listingRouter.post(
	'/listings/add',
	requireLoggedIn,
	fileUpload,
	createListingHandler
);
listingRouter.get('/listings/all', getAllListingsHandler);

listingRouter.get(
	'/listings/single/:id',
	processRequestParams(getSingleListingSchema.params),
	getSingleListingHandler
);

listingRouter.patch('/listings/update/:id', fileUpload, updateListingHandler);
// listingRouter.delete('/listings/delete/:id', listingController.deleteListing);
// listingRouter.put('/listings/approve/:id', listingController.approveListing);
// listingRouter.delete(
// 	'/listings/delete-file/:id/:type/:key',
// 	listingController.deleteFile
// );

export default listingRouter;
