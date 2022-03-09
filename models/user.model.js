import mongoose from 'mongoose';
import Listing from './listing.model.js';
import Property from './property.model.js';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		properties: [{ type: mongoose.SchemaTypes.ObjectId, ref: Property }],
		listings: [{ type: mongoose.SchemaTypes.ObjectId, ref: Listing }],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
