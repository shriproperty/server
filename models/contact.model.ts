import { prop, getModelForClass } from '@typegoose/typegoose';

export class Contact {
	@prop({ required: true })
	name: string;

	@prop({ required: true })
	email: string;

	@prop({ required: true })
	phone: string;

	@prop({ required: true })
	subject: string;

	@prop({ required: true })
	message: string;

	@prop({
		required: true,
		enum: ['Pending', 'In Progress', 'Completed'],
		default: 'Pending',
	})
	status: string;
}

export const ContactModel = getModelForClass(Contact, {
	schemaOptions: {
		timestamps: true,
	},
});
