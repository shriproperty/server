import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
	// property
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	type: { type: String, required: true, enum: ['Rental', 'Sell'] },
	catagory: {
		type: String,
		required: true,
		enum: [
			'Residential Apartment',
			'Independent House/Villa',
			'Residential Land',
			'Commercial Office',
			'Serviced Apartments',
			'1 RK/ Studio Apartment',
			'Independent/Builder Floor',
			'Other',
		],
	},

	// other details
	sizes: { type: Number, required: true },
	bedroom: { type: Number, required: true, default: null },
	bathroom: { type: Number, required: true, default: null },
	parking: { type: Number, required: true, default: null },
	propertyImage: { type: Object, required: true },
	propertyVideo: { type: Object, required: false },
	documents: { type: Object, required: false },

	// owner
	owner: { type: String, required: true },
	ownerImage: { type: Object, required: true },
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
