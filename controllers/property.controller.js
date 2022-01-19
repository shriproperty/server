import Property from '../models/property.model.js';
import {
	deleteMultipleFiles,
	deleteSingleFile,
} from '../helpers/deleteFiles.helper.js';
import { uploadFile } from '../helpers/s3.helper.js';

/* ----------------------------- create property ----------------------------- */
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

		// validate user input
		if (
			!title ||
			!description ||
			!price ||
			!type ||
			!catagory ||
			!size ||
			!unit ||
			!address ||
			!otherFeatures
		) {
			deleteMultipleFiles(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Title, Description, Price, Type, Catagory, Size, Unit, Address and other features are required',
			});
		}

		// validate type
		if (type !== 'Rental' && type !== 'Sale') {
			deleteMultipleFiles(req.files);
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
			deleteMultipleFiles(req.files);
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
			deleteMultipleFiles(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Status can only be one of the following: Unfurnished, Semifurnished, Furnished, null',
				data: {},
			});
		}

		//TODO: add more fields for unit enum
		if (unit !== 'sq' && unit !== 'marla') {
			deleteMultipleFiles(req.files);
			return res.status(400).json({
				success: false,
				message: 'Unit can only be "sq" or "marla"',
			});
		}

		// upload files to aws s3
		for (let file of req.files) {
			const response = await uploadFile(file);

			// push file paths to respoective arrays
			if (file.fieldname === 'images') {
				images.push(response.Location);
			} else if (file.fieldname === 'videos') {
				videos.push(response.Location);
			} else if (file.fieldname === 'documents') {
				documents.push(response.Location);
			}

			// delete files from uploads folder
			deleteSingleFile(file.path);
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
		console.log(err);

		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* --------------------------- get all properties --------------------------- */

export const getAll = async (req, res) => {
	try {
		const { featured } = req.query;

		if (featured) {
			const featuredProperties = await Property.find({ featured: true });

			return res.status(200).json({
				success: true,
				message: 'All Featured Properties fetched successfully',
				data: featuredProperties,
			});
		}

		const properties = await Property.find();

		res.status(200).json({
			success: true,
			message: 'All properties fetched successfully',
			data: properties,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};
