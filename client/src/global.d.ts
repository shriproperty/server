export {};

declare global {
	interface ApiResponse {
		success: boolean;
		message: string;
		data: any;
	}
}
