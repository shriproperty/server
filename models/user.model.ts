import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Listing } from './listing.model';
import { Property } from './property.model';

export class User {
	@prop({ required: true })
	name: string;

	@prop({ required: true })
	email: string;

	@prop({ required: true })
	phone: string;

	@prop({ required: true })
	password: string;

	@prop({ ref: () => Property, default: [] })
	properties: Ref<Property>[];

	@prop({ ref: () => Listing, default: [] })
	listings: Ref<Listing>[];
}

export const UserModel = getModelForClass(User, {
	schemaOptions: {
		timestamps: true,
	},
});
