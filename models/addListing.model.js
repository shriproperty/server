'use strict';

import mongoose from 'mongoose';

const addListingSchema = new mongoose.Schema({
	// property
	title: { type: String, required: true, default: '' },
	description: { type: String, required: true, default: '' },
	price: { type: String, required: true, default: 0 },
	specialPrice: { type: String, required: true, default: '0' },
	type: {
		type: String,
		required: true,
		enum: ['Rental', 'Sale'],
		default: 'Rental',
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
		default: 'Residential Apartment',
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
	//TODO: Add enum for unit
	unit: { type: String, required: true },
	bedroom: { type: String, required: true, default: 1 },
	bathroom: { type: String, required: true, default: 1 },
	openParking: { type: String, required: true, default: 0 },
	closeParking: { type: String, required: true, default: 0 },
	kitchen: { type: String, required: true, default: 1 },
	livingRoom: { type: String, required: true, default: 0 },
	store: { type: String, required: true, default: 0 },
	balcony: { type: String, required: true, default: 0 },
	dinningRoom: { type: String, required: true, default: 0 },
	floor: { type: String, required: true, default: 'ground' },
	poojaRoom: { type: String, required: true, default: 0 },
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

const AddListing = mongoose.model('AddListing', addListingSchema);

export default AddListing;
