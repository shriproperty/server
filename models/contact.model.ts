import { prop, getModelForClass } from '@typegoose/typegoose';

enum Status {
	Pending = 'Pending',
	InProgress = 'In Progress',
	Completed = 'Completed',
}

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
		enum: Status,
		default: 'Pending',
	})
	status: string;
}

export const ContactModel = getModelForClass(Contact, {
	schemaOptions: {
		timestamps: true,
	},
});
