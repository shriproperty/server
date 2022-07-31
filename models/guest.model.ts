import { getModelForClass, prop } from "@typegoose/typegoose";

/**
 * Guest Model
 *
 * @class Guest
 */
export class Guest {
	@prop({ required: true })
	public name: string;

	@prop({ required: true })
	public email: string;

	@prop({ required: true })
	public phone: string;

	@prop({
		required: true,
		enum: ["Pending", "Rejected", "Call Again", "Done"],
		default: "Pending",
	})
	public callingStatus: string;

	@prop()
	public callAgainDate: String;

	@prop()
	public talkProgress: string;
}

export const GuestModel = getModelForClass(Guest, {
	schemaOptions: {
		timestamps: true,
	},
});
