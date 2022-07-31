import { Router } from "express";
import { processRequestBody, processRequestParams } from "zod-express-middleware";
import * as guestController from "../controllers/guest.controller";
import {
	deleteGuestSchema,
	registerNewSchema,
	updateGuestCallingStatusSchema,
} from "../schemas/guest.schema";

const GuestRouter = Router();

GuestRouter.post(
	"/guests/add",
	processRequestBody(registerNewSchema.body),
	guestController.registerNewGuestHandler,
);
GuestRouter.get("/guests/all", guestController.getAllGuestsHandler);
GuestRouter.get("/guests/verify", guestController.verifyGuestHandler);
GuestRouter.patch(
	"/guests/update-calling-status/:id",
	processRequestBody(updateGuestCallingStatusSchema.body),
	processRequestParams(updateGuestCallingStatusSchema.params),
	guestController.updateGuestCallingStatusHandler,
);
GuestRouter.delete(
	"/guests/delete/:id",
	processRequestParams(deleteGuestSchema.params),
	guestController.deleteGuestHandler,
);

export default GuestRouter;
