export {};

declare global {
	type ObjectWithAnyKeys = {
		[key: string]: string;
	};

	type ButtonTypes = 'submit' | 'reset' | 'button';

	interface ApiResponse {
		success: boolean;
		message: string;
		data: any;
	}
}
