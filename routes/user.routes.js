import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/users/get-all', userController.getAllUsers);

export default userRouter;
