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

const BUCKET = process.env.AWS_BUCKET_NAME as string;

/**
 * @param {object} file file to be uploaded to s3
 * @return {Promise<object>} response from s3
 */
export function uploadFileToS3(file: {
	path: string;
	filename: string;
}): Promise<S3FileUploadResponse> {
	const fileStream = createReadStream(file.path);

	const uploadParams = {
		Bucket: BUCKET,
		Body: fileStream,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
}

/**
 * This function will take file `key` as param and delete that file form S3
 * @param {string}  key to be deleted from s3
 */
export function deleteSingleFileFromS3(key: string): Promise<object> {
	const params = {
		Bucket: BUCKET,
		Key: key,
	};

	return s3.deleteObject(params).promise();
}

/**
 * @param {object[]} files array of files to be deleted from s3
 * @example
 * ```js
 * deleteMultiple([...images, ...videos, ...documents]);
 * ```
 */
export async function deleteMultipleFilesFromS3(files: S3File[]) {
	for (let file of files) {
		await deleteSingleFileFromS3(file.key);
	}
}
