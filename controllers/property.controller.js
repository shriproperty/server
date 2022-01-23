'use strict';

import Property from '../models/property.model.js';

import {
	deleteMultipleFilesFromDisk,
	deleteSingleFileFromDisk,
} from '../helpers/deleteFiles.helper.js';
import {
	uploadFileToS3,
	deleteMultipleFilesFromS3,
	deleteSingleFileFromS3,
} from '../helpers/s3.helper.js';

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
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Title, Description, Price, Type, Catagory, Size, Unit, Address and other features are required',
			});
		}

		// validate type
		if (type !== 'Rental' && type !== 'Sale') {
			deleteMultipleFilesFromDisk(req.files);
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
			deleteMultipleFilesFromDisk(req.files);
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
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Status can only be one of the following: Unfurnished, Semifurnished, Furnished, null',
				data: {},
			});
		}

		//TODO: add more fields for unit enum
		if (unit !== 'sq' && unit !== 'marla') {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Unit can only be "sq" or "marla"',
			});
		}

		// validate featured
		if (featured !== true && featured !== false) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Featured can only be true or false',
			});
		}

		// upload files to aws s3
		for (let file of req.files) {
			const response = await uploadFileToS3(file);

			const fileObject = { url: response.Location, key: response.Key };

			// push file paths to respoective arrays
			if (file.fieldname === 'images') {
				images.push(fileObject);
			} else if (file.fieldname === 'videos') {
				videos.push(fileObject);
			} else if (file.fieldname === 'documents') {
				documents.push(fileObject);
			}

			// delete files from uploads folder
			deleteSingleFileFromDisk(file.path);
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
		deleteMultipleFilesFromDisk(req.files);

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

/* ----------------------------- update property ---------------------------- */
export const update = async (req, res) => {
	try {
		const { id } = req.params;

		const {
			title,
			description,
			price,
			specialPrice,
			status,
			featured,
			otherFeatures,
		} = req.body;

		const images = [];
		const videos = [];
		const documents = [];

		// validate input
		if (
			status !== 'Unfurnished' &&
			status !== 'Semifurnished' &&
			status !== 'Furnished' &&
			status !== undefined
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Status can only be one of the following: Unfurnished, Semifurnished, Furnished',
				data: {},
			});
		}

		// validate featured
		if (featured !== true && featured !== false && featured !== undefined) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Featured can only be true or false',
				data: {},
			});
		}

		const propertyFromDB = await Property.findById(id);

		if (req.files.length > 0) {
			// upload files to aws s3
			for (let file of req.files) {
				const response = await uploadFileToS3(file);

				const fileObject = {
					url: response.Location,
					key: response.Key,
				};

				// push file paths to respoective arrays
				if (file.fieldname === 'images') {
					images.push(fileObject);
				} else if (file.fieldname === 'videos') {
					videos.push(fileObject);
				} else if (file.fieldname === 'documents') {
					documents.push(fileObject);
				}

				// delete files from uploads folder
				deleteSingleFileFromDisk(file.path);
			}

			// delete files from aws s3
			const filesToDelete = [
				...propertyFromDB.images,
				...propertyFromDB.videos,
				...propertyFromDB.documents,
			];
			deleteMultipleFilesFromS3(filesToDelete);
		}

		// update property
		const updatedProperty = await Property.findByIdAndUpdate(
			id,
			{
				title,
				description,
				price,
				specialPrice,
				status,
				featured,
				otherFeatures,
				images: images.length > 0 ? images : propertyFromDB.images,
				documents:
					documents.length > 0 ? documents : propertyFromDB.documents,
				videos: videos.length > 0 ? videos : propertyFromDB.videos,
			},
			{ new: true }
		);

		// send response
		res.status(200).json({
			success: true,
			message: 'Property updated successfully',
			data: updatedProperty,
		});
	} catch (err) {
		console.log(err);
		deleteMultipleFilesFromDisk(req.files);

		res.status(400).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* ----------------------------- delete property ---------------------------- */
export const deleteProperty = async (req, res) => {
	try {
		const { id } = req.params;

		const property = await Property.findById(id);

		const filesArray = [
			...property.images,
			...property.documents,
			...property.videos,
		];

		// delete files from s3
		await deleteMultipleFilesFromS3(filesArray);

		// delete property from DB
		const deletedProperty = await Property.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: 'Property deleted successfully',
			data: deletedProperty,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};
