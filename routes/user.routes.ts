import { Router } from 'express';
import { getAll, getSingleUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/users/all', getAll);
userRouter.get('/users/single/:id', getSingleUser);
// userRouter.get('/users/decode', userController.decode);

export default userRouter;
