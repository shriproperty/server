'use strict';

import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
	// property
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: String, required: true },
	specialPrice: { type: String, required: false },
	type: {
		type: String,
		required: false,
		enum: ['Rental', 'Sale', 'PG'],
		default: 'Sale',
	},
	security: { type: String, required: false },
	maintenance: { type: String, required: false },
	category: {
		type: String,
		required: false,
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
		default: 'Other',
	},

	status: {
		type: String,
		required: false,
		enum: ['Unfurnished', 'Semifurnished', 'Furnished'],
		default: 'Unfurnished',
	},
	featured: { type: Boolean, required: false, default: false },

	// other details
	size: { type: String, required: true },
	unit: {
		type: String,
		required: false,
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
	},

	bedroom: { type: String, required: false, default: 0 },
	bathroom: { type: String, required: false, default: 0 },
	openParking: { type: String, required: false, default: 0 },
	closeParking: { type: String, required: false, default: 0 },
	kitchen: { type: String, required: false, default: 0 },
	livingRoom: { type: String, required: false, default: 0 },
	store: { type: String, required: false, default: 0 },
	balcony: { type: String, required: false, default: 0 },
	dinningRoom: { type: String, required: false, default: 0 },
	floor: { type: String, required: false, default: 'Ground' },
	poojaRoom: { type: String, required: false, default: 0 },
	otherFeatures: { type: Array, required: false, default: [] },
	lobby: { type: String, required: false, default: 0 },
	direction: {
		type: String,
		required: false,
		default: null,
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
	},
	purchaseType: {
		type: String,
		required: false,
		default: 'New Booking',
	},
	constructionStatus: {
		type: String,
		required: false,
		default: 'Ready to Move',
	},
	// images
	images: { type: Array, required: false },
	videos: { type: Array, required: false },
	documents: { type: Array, required: false },

	//location
	address: { type: String, required: true },
	location: { type: String, required: false, default: '' },
	locality: { type: String, required: false, default: '' },

	// owner/builder
	owner: { type: String, required: true },
	ownerContact: { type: String, required: true },
	ownerId: { type: mongoose.SchemaTypes.ObjectId, required: false },
	commission: { type: String, required: true },

	age: { type: String, required: false },
	possession: { type: String, required: false, default: 'Immediate' },
	furnishingDetails: {
		type: Object,
		required: false,
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
	},
	facilities: {
		type: Array,
		required: false,
	},
	sold: { type: Boolean, required: false, default: false },
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
