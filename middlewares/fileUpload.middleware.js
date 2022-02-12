'use strict';

/* eslint-disable valid-jsdoc */
/* eslint-disable pii/no-phone-number */

import multer from 'multer';

/**
 * The multer.diskStorage() function is used to specify where the file should be stored.
 * The multer.diskStorage() function takes a callback function as an argument.
 * The callback function is called with two arguments, an error and a path.
 * The error argument is null if the file was successfully stored.
 * The path argument is the path where the file was stored.
 */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

/**
 * this function filter images and videos based on the file type
 */
const fileFilter = (req, file, cb) => {
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

		// throw error
		cb(
			new Error(
				'Only .png, .jpg, .jpeg, .pdf and .mp4 files are allowed!'
			),
			false
		);
	}
};

const upload = multer({ fileFilter: fileFilter, storage: storage });

// upload file middleware
const fileUpload = (req, res, next) => {
	upload.any()(req, res, err => {
		// send error if file type is incorrect
		if (err) {
			return res.status(400).json({
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
