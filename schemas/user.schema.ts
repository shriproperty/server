import { z } from 'zod';

export const getSingleUserSchema = {
	params: z.object({
		id: z.string(),
	}),
	query: z.object({
		listings: z.string().optional(),
		properties: z.string().optional(),
	}),
};

export type GetSingleUserParams = z.TypeOf<typeof getSingleUserSchema.params>;
export type GetSingleUserQuery = z.TypeOf<typeof getSingleUserSchema.query>;

export const resetPasswordSchema = {
	body: z.object({
		email: z.string({ required_error: 'email is required' }).email(),
		newPassword: z.string({
			required_error: 'new password field is required',
		}),
	}),
};

export type ResetPasswordBody = z.TypeOf<typeof resetPasswordSchema.body>;
