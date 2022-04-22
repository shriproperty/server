import { object, string, TypeOf } from 'zod';

export const signupSchema = {
	body: object({
		name: string({ required_error: 'name is required' })
			.min(3, 'name must be at least 3 characters long')
			.max(20, 'name can not be longer than 20 characters'),

		email: string({ required_error: 'email is required' }).email(),

		phone: string({ required_error: 'phone is required' }),

		password: string({ required_error: 'password is required' })
			.min(4, 'password should be longer than 4 characters')
			.max(30, 'password can not be longer than 30 characters'),

		cpassword: string({ required_error: 'cpassword is required' })
			.min(4, 'password should be longer than 4 characters')
			.max(30, 'password can not be longer than 30 characters'),
	}).refine(data => data.password === data.cpassword, {
		message: 'Password and confirm password do not match',
		path: ['cpassword'],
	}),
};

export type SignupBody = TypeOf<typeof signupSchema.body>;

export const loginSchema = {
	body: object({
		email: string({ required_error: 'email is required' }).email(),
		password: string({ required_error: 'password is required' }),
	}),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;

export const resetPasswordSchema = {
	body: object({
		email: string({ required_error: 'email is required' }).email(),
		newPassword: string({
			required_error: 'new password field is required',
		}),
	}),
};

export type ResetPasswordBody = TypeOf<typeof resetPasswordSchema.body>;
