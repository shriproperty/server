import { object, string, TypeOf } from 'zod';

export const createContactSchema = {
	body: object({
		name: string({ required_error: 'name is required' })
			.min(3, 'name is cannot be small than 3 characters')
			.max(30, 'name is longer than 30 characters'),

		email: string({ required_error: 'email is required' }).email(
			'please enter a valid email'
		),

		phone: string({ required_error: 'phone is required' })
			.min(10, 'phone must be 10 digits long')
			.max(10, 'phone must be 10 digits long'),

		subject: string({ required_error: 'subject is required' }),

		message: string({ required_error: 'message is required' }),
	}),
};

export type CreateContactBody = TypeOf<typeof createContactSchema.body>;

export const updateContactStatusSchema = {
	body: object({
		status: string({ required_error: 'status is required' }),
	}),

	params: object({
		id: string({ required_error: 'id is required' }),
	}),
};

export type UpdateContactStatusBody = TypeOf<
	typeof updateContactStatusSchema.body
>;

export type UpdateContactStatusParams = TypeOf<
	typeof updateContactStatusSchema.params
>;
