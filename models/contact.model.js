import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
	subject: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: Number, required: true },
	message: { type: String, required: true },
	status: {
		type: String,
		required: true,
		default: 'Pending',
		enum: ['Pending', 'In Progress', 'Completed'],
	},
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
