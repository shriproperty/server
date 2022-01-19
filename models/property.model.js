import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
	// property
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: String, required: true },
	specialPrice: { type: String, required: true },
	type: { type: String, required: true, enum: ['Rental', 'Sale'] },
	catagory: {
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
	//TODO: Add enum for unit
	unit: { type: String, required: true },
	bedroom: { type: String, required: true, default: null },
	bathroom: { type: String, required: true, default: null },
	parking: { type: String, required: true, default: null },
	kitchen: { type: String, required: true, default: null },
	otherFeatures: { type: Array, required: true },

	// images
	images: { type: Array, required: true },
	videos: { type: Array, required: false },
	documents: { type: Array, required: false },

	//location
	address: { type: String, required: true },
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
