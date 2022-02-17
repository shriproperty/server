import { Router } from 'express';
import * as addListingController from '../controllers/addListing.controller.js';

const addListingRouter = Router();

addListingRouter.post('/add-listing/add', addListingController.addNewListing);
addListingRouter.get('/add-listing/all', addListingController.getAll);
addListingRouter.get('/add-listing/single/:id', addListingController.getSingle);
addListingRouter.patch('/add-listing/update/:id', addListingController.update);
addListingRouter.delete(
	'/add-listing/delete/:id',
	addListingController.deleteListing
);

export default addListingRouter;
