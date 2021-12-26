import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

import authRouter from './routes/auth.routes.js';

const app = express();

/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());

/* --------------------------------- routes --------------------------------- */
app.use('/api', authRouter);

/* --------------------------------- server --------------------------------- */
mongoose.connect(`${process.env.DB_URI}`, () => {
	app.listen(8000);
});

export default app;
