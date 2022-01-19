/* eslint-disable sonarjs/no-unused-collection */

import AWS from 'aws-sdk';
import { createReadStream } from 'fs';
import { config } from 'dotenv';

config();

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * @param {string} file file to be uploaded to s3
 * @return {object} response from s3
 */
export const uploadFile = file => {
	const fileStream = createReadStream(file.path);

	const uploadParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Body: fileStream,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
};
