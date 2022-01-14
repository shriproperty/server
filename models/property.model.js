import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
	// property
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
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

	// other details
	size: { type: Number, required: true },
	unit: { type: String, required: true },
	bedroom: { type: Number, required: true, default: null },
	bathroom: { type: Number, required: true, default: null },
	parking: { type: Number, required: true, default: null },
	kitchen: { type: Number, required: true, default: null },
	otherFeatures: { type: Array, required: true },

	// images
	propertyImage: { type: Object, required: true },
	propertyVideo: { type: Object, required: false },
	documents: { type: Object, required: false },

	//location
	address: { type: String, required: true },
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
