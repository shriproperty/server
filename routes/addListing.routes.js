import { Router } from 'express';
import * as addListingController from '../controllers/addListing.controller.js';

const addListingRouter = Router();

addListingRouter.post('/add-listing/add', addListingController.addNewListing);

export default addListingRouter;
