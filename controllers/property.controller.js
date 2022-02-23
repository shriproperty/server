'use strict';

import Property from '../models/property.model.js';

import {
	deleteMultipleFilesFromDisk,
	deleteSingleFileFromDisk,
} from '../helpers/deleteFiles.helper.js';
import {
	uploadFileToS3,
	deleteMultipleFilesFromS3,
} from '../helpers/s3.helper.js';

/* ----------------------------- create property ----------------------------- */
export const createProperty = async (req, res) => {
	try {
		const {
			title,
			description,
			price,
			specialPrice,
			type,
			category,
			status,
			size,
			unit,
			featured,
			bedroom,
			bathroom,
			openParking,
			closeParking,
			livingRoom,
			dinningRoom,
			store,
			poojaRoom,
			balcony,
			floor,
			direction,
			kitchen,
			otherFeatures,
			address,
			owner,
			ownerContact,
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
			!category ||
			!size ||
			!unit ||
			!address ||
			!direction ||
			!owner ||
			!ownerContact
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Title, Description, Price, Type, category, Size, Unit, Address, Direction, Owner, Owner Contact and are required',
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

		// validate category
		if (
			category !== 'Residential Apartment' &&
			category !== 'Independent House/Villa' &&
			category !== 'Plot' &&
			category !== 'Commercial Office' &&
			category !== 'Serviced Apartments' &&
			category !== '1 RK/ Studio Apartment' &&
			category !== 'Independent/Builder Floor' &&
			category !== 'Other'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'category can only be one of the following: Residential Apartment, Independent House/Villa, Plot, Commercial Office, Serviced Apartments, 1 RK/ Studio Apartment, Independent/Builder Floor, Other',
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

		if (
			unit !== 'Sq. Ft.' &&
			unit !== 'Acre' &&
			unit !== 'Gaj' &&
			unit !== 'Marla' &&
			unit !== 'Bigha' &&
			unit !== 'Bigha-Pucca' &&
			unit !== 'Bigha-Kachha' &&
			unit !== 'Biswa' &&
			unit !== 'Biswa-Pucca' &&
			unit !== 'Kanal' &&
			unit !== 'Killa' &&
			unit !== 'Kattha' &&
			unit !== 'Ghumaon'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Unit can only be one of the following: sq, marla',
			});
		}

		// validate featured
		if (featured !== 'true' && featured !== 'false') {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Featured can only be true or false',
			});
		}

		// validate direction
		if (
			direction !== 'North' &&
			direction !== 'South' &&
			direction !== 'East' &&
			direction !== 'West' &&
			direction !== 'North-East' &&
			direction !== 'North-West' &&
			direction !== 'South-East' &&
			direction !== 'South-West'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Direction can only be one of the following: North, South, East, West, North-East, North-West, South-East, South-West',
				data: {},
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
			category,
			status,
			size,
			unit,
			featured,
			bedroom,
			bathroom,
			openParking,
			closeParking,
			livingRoom,
			dinningRoom,
			store,
			poojaRoom,
			balcony,
			floor,
			direction,
			kitchen,
			otherFeatures,
			address,
			images,
			documents,
			videos,
			owner,
			ownerContact,
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

/* --------------------------- get single property -------------------------- */
export const getSingle = async (req, res) => {
	try {
		const { id } = req.params;

		const property = await Property.findById(id);

		res.status(200).json({
			success: true,
			message: 'Property fetched successfully',
			data: property,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Invalid Id',
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
			address,
			price,
			specialPrice,
			size,
			type,
			category,
			unit,
			bedroom,
			bathroom,
			openParking,
			closeParking,
			kitchen,
			livingRoom,
			store,
			balcony,
			dinningRoom,
			floor,
			poojaRoom,
			direction,
			status,
			featured,
			otherFeatures,
		} = req.body;

		const images = [];
		const videos = [];
		const documents = [];

		const filesToDelete = [];

		// validate type
		if (type !== 'Rental' && type !== 'Sale') {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Type must be either Rental or Sale',
				data: {},
			});
		}

		// validate category
		if (
			category !== 'Residential Apartment' &&
			category !== 'Independent House/Villa' &&
			category !== 'Plot' &&
			category !== 'Commercial Office' &&
			category !== 'Serviced Apartments' &&
			category !== '1 RK/ Studio Apartment' &&
			category !== 'Independent/Builder Floor' &&
			category !== 'Other'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'category can only be one of the following: Residential Apartment, Independent House/Villa, Plot, Commercial Office, Serviced Apartments, 1 RK/ Studio Apartment, Independent/Builder Floor, Other',
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

		if (
			unit !== 'Sq. Ft.' &&
			unit !== 'Acre' &&
			unit !== 'Gaj' &&
			unit !== 'Marla' &&
			unit !== 'Bigha' &&
			unit !== 'Bigha-Pucca' &&
			unit !== 'Bigha-Kachha' &&
			unit !== 'Biswa' &&
			unit !== 'Biswa-Pucca' &&
			unit !== 'Kanal' &&
			unit !== 'Killa' &&
			unit !== 'Kattha' &&
			unit !== 'Ghumaon'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Unit can only be "sq" or "marla"',
			});
		}

		// validate featured
		if (featured !== 'true' && featured !== 'false') {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Featured can only be true or false',
			});
		}

		// validate direction
		if (
			direction !== 'North' &&
			direction !== 'South' &&
			direction !== 'East' &&
			direction !== 'West' &&
			direction !== 'North-East' &&
			direction !== 'North-West' &&
			direction !== 'South-East' &&
			direction !== 'South-West'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Direction can only be one of the following: North, South, East, West, North-East, North-West, South-East, South-West',
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

			/**
			 * delete only those files which we are getting from the request
			 * eg if we are updating property and we are not getting any new images
			 * but we are getting new videos and documents
			 * then we will delete only videos and documents not images
			 */
			if (images.length > 0) filesToDelete.push(...propertyFromDB.images);
			if (videos.length > 0) filesToDelete.push(...propertyFromDB.videos);
			if (documents.length > 0)
				filesToDelete.push(...propertyFromDB.documents);

			deleteMultipleFilesFromS3(filesToDelete);
		}

		// update property
		const updatedProperty = await Property.findByIdAndUpdate(
			id,
			{
				title,
				description,
				address,
				price,
				specialPrice,
				size,
				type,
				category,
				unit,
				bedroom,
				bathroom,
				openParking,
				closeParking,
				kitchen,
				livingRoom,
				store,
				balcony,
				dinningRoom,
				floor,
				poojaRoom,
				direction,
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
