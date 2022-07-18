import { Router } from 'express';
import { processRequestParams } from 'zod-express-middleware';
import {
	approveListingHandler,
	createListingHandler,
	deleteListingHandler,
	getAllListingsHandler,
	getSingleListingHandler,
	updateListingHandler,
	deleteSpecificFileFromListingHandler
} from '../controllers/listing.controller';
import fileUpload from '../middlewares/fileUpload.middleware';
import requireLoggedIn from '../middlewares/requireLoggedIn.middleware';
import {
	deleteListingSchema,
	getSingleListingSchema,
} from '../schemas/listing.schema';

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

listingRouter.delete(
	'/listings/delete/:id',
	processRequestParams(deleteListingSchema.params),
	deleteListingHandler
);

listingRouter.put('/listings/approve/:id', approveListingHandler);

listingRouter.delete(
	'/listings/delete-file/:id/:type/:key',
	deleteSpecificFileFromListingHandler
);

export default listingRouter;
