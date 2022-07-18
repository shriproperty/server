import { prop, getModelForClass, Ref, pre } from '@typegoose/typegoose';
import { compare, genSalt, hash } from 'bcrypt';
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
	public name: string;

	@prop({ required: true, unique: true })
	public email: string;

	@prop({ required: true })
	public phone: string;

	@prop({ required: true })
	public password: string;

	@prop({ required: true, ref: () => Property, default: [] })
	public properties: Ref<Property>[];

	@prop({ required: true, ref: () => Listing, default: [] })
	public listings: Ref<Listing>[];

	public async comparePassword(password: string): Promise<boolean> {
		return compare(password, this.password);
	}
}

export const UserModel = getModelForClass(User, {
	schemaOptions: {
		timestamps: true,
	},
});
