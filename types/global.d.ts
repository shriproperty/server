export {};

declare global {
	type MulterFile = Express.Multer.File;

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
