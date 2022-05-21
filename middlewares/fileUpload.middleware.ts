/* eslint-disable valid-jsdoc */
/* eslint-disable pii/no-phone-number */

import multer, { FileFilterCallback } from 'multer';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
type File = Express.Multer.File;

const storage = multer.diskStorage({
	destination: (req: Request, file: File, cb: DestinationCallback) => {
		cb(null, 'uploads/');
	},
	filename: (req: Request, file: File, cb: FileNameCallback) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

/**
 * this function filter images and videos based on the file type
 */
const fileFilter = (req: Request, file: File, cb: FileFilterCallback) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'application/pdf' ||
		file.mimetype === 'video/mp4'
	) {
		// to accept files pass true
		cb(null, true);
	} else {
		// to reject files pass false
		cb(null, false);

		throw new Error('Invalid file type');
	}
};

const upload = multer({ fileFilter: fileFilter, storage: storage });

// upload file middleware
const fileUpload = (req: Request, res: Response, next: NextFunction) => {
	upload.any()(req, res, err => {
		// send error if file type is incorrect
		if (err) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message:
					'You can only upload .png, .jpg, .jpeg, .pdf and .mp4 files',
				data: {},
			});
		}

		next();
	});
};

export default fileUpload;
