import { object, string, TypeOf } from 'zod';

export const getSingleUserSchema = {
	params: object({
		id: string(),
	}),
	query: object({
		listings: string().optional(),
		properties: string().optional(),
	}),
};

export type GetSingleUserParams = TypeOf<typeof getSingleUserSchema.params>;
export type GetSingleUserQuery = TypeOf<typeof getSingleUserSchema.query>;

export const resetPasswordSchema = {
	body: object({
		email: string({ required_error: 'email is required' }).email(),
		newPassword: string({
			required_error: 'new password field is required',
		}),
	}),
};

export type ResetPasswordBody = TypeOf<typeof resetPasswordSchema.body>;
