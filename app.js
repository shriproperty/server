import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import fileUpload from './middlewares/fileUpload.middleware.js';

config();

import apiAuth from './middlewares/apiAuth.middleware.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import contactRouter from './routes/contact.routes.js';
import productRouter from './routes/product.routes.js';

const app = express();

/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());
app.use('/api', apiAuth);
app.use('/api', fileUpload);

/* --------------------------------- routes --------------------------------- */
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', contactRouter);
app.use('/api', productRouter);

/* --------------------------------- server --------------------------------- */
mongoose.connect(`${process.env.DB_URI}`, () => {
	app.listen(8000);
});

export default app;
