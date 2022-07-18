import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Listing {
	@prop({ required: true })
	public title: string;

	@prop({ required: true })
	public description: string;

	@prop({ required: true })
	public price: string;

	@prop()
	public specialPrice: string;

	@prop({ required: true, enum: ['Rental', 'Sale', 'PG'], default: 'Sale' })
	public type: string;

	@prop({
		required: true,
		enum: [
			'Residential Apartment',
			'Independent House/Villa',
			'Plot',
			'Commercial Office',
			'Serviced Apartments',
			'1 RK/ Studio Apartment',
			'Independent/Builder Floor',
			'Other',
		],
		default: 'Independent/Builder Floor',
	})
	public category: string;

	@prop()
	public security: string;

	@prop()
	public maintenance: string;

	@prop({
		required: true,
		enum: ['Unfurnished', 'Semifurnished', 'Furnished'],
		default: 'Unfurnished',
	})
	public status: string;

	@prop({ default: false })
	public featured: boolean;

	@prop()
	public size: string;

	@prop({
		required: true,
		enum: [
			'Sq. Ft.',
			'Acre',
			'Gaj',
			'Marla',
			'Bigha',
			'Bigha-Pucca',
			'Bigha-Kachha',
			'Biswa',
			'Biswa–Pucca',
			'Kanal',
			'Killa',
			'Kattha',
			'Ghumaon',
		],
	})
	public unit: string;

	@prop()
	public bedroom: string;

	@prop()
	public bathroom: string;

	@prop()
	public kitchen: string;

	@prop()
	public openParking: string;

	@prop()
	public closeParking: string;

	@prop()
	public livingRoom: string;

	@prop()
	public store: string;

	@prop()
	public balcony: string;

	@prop()
	public dinningRoom: string;

	@prop()
	public floor: string;

	@prop()
	public poojaRoom: string;

	@prop()
	public otherFeatures: string[];

	@prop()
	public lobby: string;

	@prop({
		enum: [
			'North',
			'South',
			'East',
			'West',
			'North-East',
			'North-West',
			'South-East',
			'South-West',
		],
	})
	public direction: string;

	@prop({ enum: ['New Booking', 'Resale'], default: 'New Booking' })
	public purchaseType: string;

	@prop({
		enum: ['Ready to Move', 'Under Construction'],
		default: 'Ready to Move',
	})
	public constructionStatus: string;

	@prop()
	public images: S3File[];

	@prop()
	public videos: S3File[];

	@prop()
	public documents: S3File[];

	@prop({ required: true })
	public address: string;

	@prop()
	public location: string;

	@prop({ required: true })
	public locality: string;

	@prop({ required: true })
	public owner: string;

	@prop({ required: true })
	public ownerContact: string;

	@prop()
	public ownerId: mongoose.Types.ObjectId;

	@prop({ required: true })
	public commission: string;

	@prop()
	public age: string;

	@prop({
		required: true,
		default: 'Immediate',
		enum: [
			'Immediate',
			'Between 1 Month',
			'Between 2 Month',
			'Between 3 Month',
			'Between 6 Months',
			'2023',
			'2024',
			'2025',
			'2026',
			'2027',
			'2028',
			'2029',
			'2030',
		],
	})
	public possession: string;

	@prop({
		default: {
			ac: 0,
			stove: 0,
			modularKitchen: 0,
			fans: 0,
			fridge: 0,
			light: 0,
			beds: 0,
			microwave: 0,
			dinningTable: 0,
			tv: 0,
			dressingTable: 0,
			tvWallPanel: 0,
			wardrobe: 0,
			washingMachine: 0,
			geyser: 0,
			curtains: 0,
			sofa: 0,
			waterPurifier: 0,
			exhaust: 0,
		},
	})
	public furnishingDetails: object;

	@prop()
	public facilities: Facility[];

	@prop({ default: false })
	public sold: boolean;
}

export const ListingModel = getModelForClass(Listing, {
	schemaOptions: {
		timestamps: true,
	},
});
