'use strict';

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import fileUpload from './middlewares/fileUpload.middleware.js';

config();

import apiAuth from './middlewares/apiAuth.middleware.js';
import tempUserRouter from './routes/tempUser.routes.js';
import contactRouter from './routes/contact.routes.js';
import propertyRouter from './routes/property.routes.js';
import otpRouter from './routes/otp.routes.js';
import listingRouter from './routes/listing.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

/* ------------------------------- ANCHOR middlewares ------------------------------ */
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiAuth);
app.use('/api', fileUpload);

/* --------------------------------- ANCHOR routes --------------------------------- */
app.use('/api', tempUserRouter);
app.use('/api', contactRouter);
app.use('/api', propertyRouter);
app.use('/api', otpRouter);
app.use('/api', listingRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

/* --------------------------------- ANCHOR server --------------------------------- */
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DB_URI, () => {
	app.listen(PORT, process.env.IP);
});

export default app;
