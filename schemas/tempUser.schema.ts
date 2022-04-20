import { object, string, TypeOf } from 'zod';

/* --------------------------- ANCHOR register new -------------------------- */

export const registerNewSchema = {
	body: object({
		name: string({
			required_error: 'Name is required',
		})
			.min(3, 'name must be at least 3 character long')
			.max(20, 'name can not be long than 30 characters'),

		email: string({
			required_error: 'email is required',
		}).email('please enter a valid email'),

		phone: string({
			required_error: 'phone is required',
		})
			.min(10, 'phone should be 10 digits long remove +91 if added')
			.max(10, 'phone must be 10 digits long remove +91 if added'),

		callingStatus: string().optional(),
		callAgainDate: string().optional(),
		talkProgress: string().optional(),
	}),
};

export type RegisterNewBody = TypeOf<typeof registerNewSchema.body>;

/* ------------------------------ ANCHOR update ----------------------------- */

export const updateTempUserCallingStatusSchema = {
	body: object({
		callingStatus: string(),
		callAgainDate: string().optional(),
		talkProgress: string().optional(),
	}),

	params: object({
		id: string(),
	}),
};

export type UpdateTempUserCallingStatusBody = TypeOf<
	typeof updateTempUserCallingStatusSchema.body
>;
export type UpdateTempUserCallingStatusParams = TypeOf<
	typeof updateTempUserCallingStatusSchema.params
>;

/* ------------------------------ ANCHOR delete ----------------------------- */

export const deleteTempUserSchema = {
	params: object({
		id: string(),
	}),
};

export type DeleteTempUserParams = TypeOf<typeof deleteTempUserSchema.params>;
