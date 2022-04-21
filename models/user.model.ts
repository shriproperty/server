import { prop, getModelForClass, Ref, pre } from '@typegoose/typegoose';
import { genSalt, hash } from 'bcrypt';
import { Listing } from './listing.model';
import { Property } from './property.model';

@pre<User>('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		const salt = await genSalt(10);
		const hashedPassword = await hash(this.password, salt);

		this.password = hashedPassword;

		return next();
	}
})
export class User {
	@prop({ required: true })
	name: string;

	@prop({ required: true, unique: true })
	email: string;

	@prop({ required: true })
	phone: string;

	@prop({ required: true })
	password: string;

	@prop({ required: true, ref: 'Property', default: [] })
	properties: Ref<Property>[];

	@prop({ required: true, ref: 'Listing', default: [] })
	listings: Ref<Listing>[];
}

export const UserModel = getModelForClass(User, {
	schemaOptions: {
		timestamps: true,
	},
});
