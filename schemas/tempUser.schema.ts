import { z } from 'zod';

/* --------------------------- ANCHOR register new -------------------------- */

export const registerNewSchema = {
	body: z.object({
		name: z
			.string({
				required_error: 'Name is required',
			})
			.min(3, 'name must be at least 3 character long')
			.max(20, 'name can not be long than 30 characters'),

		email: z
			.string({
				required_error: 'email is required',
			})
			.email('please enter a valid email'),

		phone: z
			.string({
				required_error: 'phone is required',
			})
			.min(10, 'phone should be 10 digits long remove +91 if added')
			.max(10, 'phone must be 10 digits long remove +91 if added'),
	}),
};

export type RegisterNewBody = z.TypeOf<typeof registerNewSchema.body>;

/* ------------------------------ ANCHOR update ----------------------------- */

export const updateTempUserCallingStatusSchema = {
	body: z.object({
		callingStatus: z.string(),
		callAgainDate: z.string().optional(),
		talkProgress: z.string().optional(),
	}),

	params: z.object({
		id: z.string(),
	}),
};

export type UpdateTempUserCallingStatusBody = z.TypeOf<
	typeof updateTempUserCallingStatusSchema.body
>;
export type UpdateTempUserCallingStatusParams = z.TypeOf<
	typeof updateTempUserCallingStatusSchema.params
>;

/* ------------------------------ ANCHOR delete ----------------------------- */

export const deleteTempUserSchema = {
	params: z.object({
		id: z.string(),
	}),
};

export type DeleteTempUserParams = z.TypeOf<typeof deleteTempUserSchema.params>;
