import { object, string, number, TypeOf } from 'zod';

export const createContactSchema = {
	body: object({
		name: string({ required_error: 'name is required' })
			.min(3, 'name is cannot be small than 3 characters')
			.max(30, 'name is longer than 30 characters'),

		email: string({ required_error: 'email is required' }).email(
			'please enter a valid email'
		),

		phone: number({ required_error: 'phone is required' }).min(
			10,
			'phone must be 10 digits long'
		),

		subject: string({ required_error: 'subject is required' }),

		message: string({ required_error: 'message is required' }),
	}),
};

export type CreateContactBody = TypeOf<typeof createContactSchema.body>;
