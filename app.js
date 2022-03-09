'use strict';

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { spawn } from 'child_process';
import cron from 'node-cron';
import { unlink } from 'fs';
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
import logger from './helpers/logger.helper.js';
import { uploadFileToS3 } from './helpers/s3.helper.js';

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

/* ---------------------------------- ANCHOR data base backup ---------------------------------- */
const backupDB = () => {
	const child = spawn('mongodump', [
		'--db=shriproperty',
		'--archive=db.gzip',
		'--gzip',
	]);

	child.stdout.on('data', data => logger.info(data));
	// from console
	child.stderr.on('data', data => logger.info(Buffer.from(data).toString()));
	// from node js code
	child.on('error', err => logger.error(err));
	child.on('exit', async (code, signal) => {
		if (code) logger.info(`Process exit with code: ${code}`);
		else if (signal) logger.error(`Process killed with signal ${signal}`);
		else logger.info('Backup is successful');

		await uploadFileToS3({
			path: path.basename('db.gzip'),
			filename: 'db.gzip',
		});

		unlink(path.basename('db.gzip'), () =>
			logger.info('deleted .gzip file')
		);
	});
};

cron.schedule('0 0 * * *', () => backupDB());

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
