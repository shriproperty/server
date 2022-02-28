import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	properties: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Properties' }],
	listings: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Listings' }],
});

const User = mongoose.model('User', userSchema);

export default User;
