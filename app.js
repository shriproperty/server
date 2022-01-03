import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

import apiAuth from './middlewares/apiAuth.middlewares.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import contactRouter from './routes/contact.routes.js';

const app = express();

/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());
app.use('/api', apiAuth);
/* --------------------------------- routes --------------------------------- */
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', contactRouter);

/* --------------------------------- server --------------------------------- */
mongoose.connect(`${process.env.DB_URI}`, () => {
	app.listen(8000);
});

export default app;
