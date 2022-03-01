import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/users/single/:id', userController.getSingleUser);
userRouter.get('/users/decode', userController.decode);

export default userRouter;
