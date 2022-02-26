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
		required: true,
		enum: ['Rental', 'Sale'],
		default: 'Sale',
	},
	category: {
		type: String,
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
		default: 'Other',
	},

	status: {
		type: String,
		required: true,
		enum: ['Unfurnished', 'Semifurnished', 'Furnished'],
		default: 'Unfurnished',
	},
	featured: { type: Boolean, required: true, default: false },

	// other details
	size: { type: String, required: true },
	unit: {
		type: String,
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
	},

	bedroom: { type: String, required: true, default: 0 },
	bathroom: { type: String, required: true, default: 0 },
	openParking: { type: String, required: true, default: 0 },
	closeParking: { type: String, required: true, default: 0 },
	kitchen: { type: String, required: true, default: 0 },
	livingRoom: { type: String, required: true, default: 0 },
	store: { type: String, required: true, default: 0 },
	balcony: { type: String, required: true, default: 0 },
	dinningRoom: { type: String, required: true, default: 0 },
	floor: { type: String, required: true, default: 'Ground' },
	poojaRoom: { type: String, required: true, default: 0 },
	otherFeatures: { type: Array, required: true, default: [] },
	lobby: { type: String, required: true, default: 0 },
	direction: {
		type: String,
		required: true,
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
		required: true,
		enum: ['New Booking', 'Resale'],
		default: 'New Booking',
	},
	constructionStatus: {
		type: String,
		required: true,
		enum: ['Under Construction', 'Ready to Move'],
	},
	// images
	images: { type: Array, required: false },
	videos: { type: Array, required: false },
	documents: { type: Array, required: false },

	//location
	address: { type: String, required: true },

	// owner/builder
	owner: { type: String, required: true },
	ownerContact: { type: String, required: true },
	commission: { type: String, required: true },
	age: { type: String, required: false },
	possession: { type: String, required: false },
	location: { type: String, required: false, default: '' },
	furnishingDetails: {
		type: Object,
		required: false,
	},
	facilities: {
		type: Array,
		required: false,
	},
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
