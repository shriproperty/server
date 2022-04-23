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
