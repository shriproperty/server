import { z } from 'zod';

const STATUS = ['Pending', 'In Progress', 'Completed'] as const;

export const createContactSchema = {
	body: z.object({
		name: z
			.string({ required_error: 'name is required' })
			.min(3, 'name is cannot be small than 3 characters')
			.max(30, 'name is longer than 30 characters'),

		email: z
			.string({ required_error: 'email is required' })
			.email('please enter a valid email'),

		phone: z
			.string({ required_error: 'phone is required' })
			.min(10, 'phone must be 10 digits long')
			.max(10, 'phone must be 10 digits long'),

		subject: z
			.string({ required_error: 'subject is required' })
			.max(300, 'Subject should not be more than 300 characters'),

		message: z
			.string({ required_error: 'message is required' })
			.max(1000, 'Message can not be longer than 1000 characters'),
	}),
};

export type CreateContactBody = z.TypeOf<typeof createContactSchema.body>;

export const updateContactStatusSchema = {
	body: z.object({
		status: z.enum(STATUS),
	}),

	params: z.object({
		id: z.string({ required_error: 'id is required' }),
	}),
};

export type UpdateContactStatusBody = z.TypeOf<
	typeof updateContactStatusSchema.body
>;

export type UpdateContactStatusParams = z.TypeOf<
	typeof updateContactStatusSchema.params
>;
