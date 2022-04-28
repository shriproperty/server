import { z } from 'zod';

export const signupSchema = {
	body: z
		.object({
			name: z
				.string({ required_error: 'name is required' })
				.min(3, 'name must be at least 3 characters long')
				.max(20, 'name can not be longer than 20 characters'),

			email: z.string({ required_error: 'email is required' }).email(),

			phone: z.string({ required_error: 'phone is required' }),

			password: z
				.string({ required_error: 'password is required' })
				.min(4, 'password should be longer than 4 characters')
				.max(30, 'password can not be longer than 30 characters'),

			cpassword: z
				.string({ required_error: 'cpassword is required' })
				.min(4, 'password should be longer than 4 characters')
				.max(30, 'password can not be longer than 30 characters'),
		})
		.refine(data => data.password === data.cpassword, {
			message: 'Password and confirm password do not match',
			path: ['cpassword'],
		}),
};

export type SignupBody = z.TypeOf<typeof signupSchema.body>;

export const loginSchema = {
	body: z.object({
		email: z.string({ required_error: 'email is required' }).email(),
		password: z.string({ required_error: 'password is required' }),
	}),
};

export type LoginBody = z.TypeOf<typeof loginSchema.body>;
