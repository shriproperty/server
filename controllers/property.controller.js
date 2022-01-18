import Property from '../models/property.model.js';
import { deleteMultipleFiles } from '../helpers/deleteFiles.helper.js';

/* ----------------------------- create product ----------------------------- */
export const createProduct = async (req, res) => {
	try {
		const {
			title,
			description,
			price,
			specialPrice,
			type,
			catagory,
			status,
			size,
			unit,
			featured,
			bedroom,
			bathroom,
			parking,
			kitchen,
			otherFeatures,
			address,
		} = req.body;

		const images = [];
		const documents = [];
		const videos = [];

		// get images, videos and documents from request and push them to respective arrays
		req.files.forEach(file => {
			if (file.fieldname === 'images') {
				images.push(file);
			} else if (file.fieldname === 'documents') {
				documents.push(file);
			} else if (file.fieldname === 'videos') {
				videos.push(file);
			}
		});

		// validate user input
		if (
			!title ||
			!description ||
			!price ||
			!type ||
			!catagory ||
			!size ||
			!unit ||
			!address
		) {
			deleteMultipleFiles([...images, ...videos, ...documents]);
			return res.status(400).json({
				success: false,
				message:
					'Title, Description, Price, Type, Catagory, Size, Unit, Address are required',
			});
		}

		// validate type
		if (type !== 'Rental' && type !== 'Sale') {
			deleteMultipleFiles([...images, ...videos, ...documents]);
			return res.status(400).json({
				success: false,
				message: 'Type must be either Rental or Sale',
				data: {},
			});
		}

		// validate catagory
		if (
			catagory !== 'Residential Apartment' &&
			catagory !== 'Independent House/Villa' &&
			catagory !== 'Plot' &&
			catagory !== 'Commercial Office' &&
			catagory !== 'Serviced Apartments' &&
			catagory !== '1 RK/ Studio Apartment' &&
			catagory !== 'Independent/Builder Floor' &&
			catagory !== 'Other'
		) {
			deleteMultipleFiles([...images, ...videos, ...documents]);
			return res.status(400).json({
				success: false,
				message:
					'Catagory can only be one of the following: Residential Apartment, Independent House/Villa, Plot, Commercial Office, Serviced Apartments, 1 RK/ Studio Apartment, Independent/Builder Floor, Other',
				data: {},
			});
		}

		// validate status
		if (
			status !== 'Unfurnished' &&
			status !== 'Semifurnished' &&
			status !== 'Furnished' &&
			status !== null
		) {
			deleteMultipleFiles([...images, ...videos, ...documents]);
			return res.status(400).json({
				success: false,
				message:
					'Status can only be one of the following: Unfurnished, Semifurnished, Furnished, null',
				data: {},
			});
		}

		//TODO: add more fields for unit enum
		if (unit !== 'sq' && unit !== 'marla') {
			deleteMultipleFiles([...images, ...videos, ...documents]);
			return res.status(400).json({
				success: false,
				message: 'Unit can only be "sq" or "marla"',
			});
		}

		// create new property
		const property = await Property.create({
			title,
			description,
			price,
			specialPrice,
			type,
			catagory,
			status,
			size,
			unit,
			featured,
			bedroom,
			bathroom,
			parking,
			kitchen,
			otherFeatures,
			address,
			images,
			documents,
			videos,
		});

		// send response
		res.status(201).json({
			success: true,
			message: 'Property created successfully',
			data: property,
		});
	} catch (err) {
		// adding if condition so that if no images were uploaded due to an error than this callback will not be called
		if (req.files)
			deleteMultipleFiles([...images, ...videos, ...documents]);

		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};
