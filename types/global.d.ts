import mongoose from 'mongoose';

export {};

declare global {
	type MulterFile = Express.Multer.File;
	type MongodbID = mongoose.Types.ObjectId;

	interface User {
		name: string;
		email: string;
		phone: string;
		password: string;
		properties: MongodbID[];
		listings: MongodbID[];
		_id: string;
	}

	interface S3File {
		url: string;
		key: string;
	}

	interface S3FileUploadResponse {
		Location: string;
		Key: string;
	}

	interface Facility {
		title: string;
		icon: string;
	}

	interface JWT {
		id: string;
		iat: number;
	}
}
