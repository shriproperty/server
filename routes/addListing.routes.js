import { Router } from 'express';
import * as addListingController from '../controllers/addListing.controller.js';

const addListingRouter = Router();

addListingRouter.post('/add-listing/add', addListingController.addNewListing);
addListingRouter.get('/add-listing/all', addListingController.getAll);
addListingRouter.get('/add-listing/single/:id', addListingController.getSingle);

export default addListingRouter;
