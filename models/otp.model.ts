import { prop, getModelForClass } from '@typegoose/typegoose';

export class Otp {
	@prop({ required: true })
	email: string;

	@prop({ required: true })
	otp: string;

	@prop({ default: Date.now(), index: { expires: '5m' } })
	expireAt: Date;
}

export const OtpModel = getModelForClass(Otp, {
	schemaOptions: {
		timestamps: true,
	},
});
