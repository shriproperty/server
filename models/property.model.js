'use strict';

import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
	// property
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: String, required: true },
	specialPrice: { type: String, required: true },
	type: { type: String, required: true, enum: ['Rental', 'Sale'] },
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
	},
	status: {
		type: String,
		required: true,
		enum: ['Unfurnished', 'Semifurnished', 'Furnished'],
		default: null,
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

	bedroom: { type: String, required: true, default: null },
	bathroom: { type: String, required: true, default: null },
	openParking: { type: String, required: true, default: null },
	closeParking: { type: String, required: true, default: null },
	kitchen: { type: String, required: true, default: null },
	livingRoom: { type: String, required: true, default: null },
	store: { type: String, required: true, default: null },
	balcony: { type: String, required: true, default: null },
	dinningRoom: { type: String, required: true, default: null },
	floor: { type: String, required: true, default: null },
	poojaRoom: { type: String, required: true, default: null },
	otherFeatures: { type: Array, required: true },
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
	// images
	images: { type: Array, required: true },
	videos: { type: Array, required: false },
	documents: { type: Array, required: false },

	//location
	address: { type: String, required: true },

	// owner/builder
	owner: { type: String, required: true },
	ownerContact: { type: String, required: true },
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
