import { Router } from 'express';
import { getAll } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/users/all', getAll);
// userRouter.get('/users/single/:id', userController.getSingleUser);
// userRouter.get('/users/decode', userController.decode);

export default userRouter;
