'use strict';

import Listing from '../models/listing.model.js';
import Property from '../models/property.model.js';
import User from '../models/user.model.js';
import logger from '../helpers/logger.helper.js';

import {
	deleteMultipleFilesFromDisk,
	deleteSingleFileFromDisk,
} from '../helpers/deleteFiles.helper.js';

import {
	uploadFileToS3,
	deleteMultipleFilesFromS3,
	deleteSingleFileFromS3,
} from '../helpers/s3.helper.js';

/* ----------------------------- SECTION add new listing ---------------------------- */
export const addNewListing = async (req, res) => {
	try {
		// ANCHOR Get Inputs
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
			lobby,
			commission,
			age,
			possession,
			purchaseType,
			constructionStatus,
			location,
			furnishingDetails,
			facilities,
			userId,
		} = req.body;

		const parsedFacilities = [];
		const images = [];
		const documents = [];
		const videos = [];

		// ANCHOR Validate Inputs

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
			!ownerContact ||
			!commission ||
			!userId
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message: 'Please fill all the required fields',
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
			category !== 'Commercial Plot' &&
			category !== 'Serviced Apartments' &&
			category !== '1 RK/ Studio Apartment' &&
			category !== 'Independent/Builder Floor' &&
			category !== 'Other'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'category can only be one of the following: Residential Apartment, Independent House/Villa, Plot, Commercial Office, Commercial Plot, Serviced Apartments, 1 RK/ Studio Apartment, Independent/Builder Floor, Other',
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
				message: 'Invalid Unit',
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

		// validate purchase type
		if (
			purchaseType &&
			purchaseType !== 'New Booking' &&
			purchaseType !== 'Resale'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					"Purchase Type can only be either 'New Booking' or 'Resale'",
				data: {},
			});
		}

		// validate construction status
		if (
			constructionStatus &&
			constructionStatus !== 'Under Construction' &&
			constructionStatus !== 'Ready to Move'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					"Construction Status can only be either 'Under Construction' or 'Ready to Move'",
				data: {},
			});
		}

		// validate furnishing details
		if (
			/**
			 * this will first parse the furnishing details to object
			 *  and than push it's keys to an array and than check if its
			 *  length is greater than 0 so that we can check if object is empty or not
			 */
			Object.keys(JSON.parse(furnishingDetails)).length > 0 &&
			status !== 'Semifurnished' &&
			status !== 'Furnished'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Furnishing Details can only be filled when Status is either Semifurnished or Furnished',
				data: {},
			});
		}

		// ANCHOR Create Property

		// upload files to aws s3
		for (let file of req.files) {
			const response = await uploadFileToS3(file);

			const fileObject = { url: response.Location, key: response.Key };

			// push file paths to respective arrays
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

		// Parse Facilities
		if (facilities.length > 0) {
			facilities.forEach(facility =>
				parsedFacilities.push(JSON.parse(facility))
			);
		}

		// create new property
		const property = await Listing.create({
			title,
			description,
			price,
			specialPrice,
			type,
			category,
			status,
			size,
			unit,
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
			ownerId: userId,
			lobby,
			commission,
			age,
			possession,
			purchaseType,
			constructionStatus,
			location,
			facilities: parsedFacilities,
			furnishingDetails: JSON.parse(furnishingDetails),
		});

		// push listing to user
		const user = await User.findById(userId);

		await User.findByIdAndUpdate(userId, {
			listings: [...user.listings, property._id],
		});

		// send response
		res.status(201).json({
			success: true,
			message: 'Property created successfully',
			data: property,
		});
	} catch (err) {
		logger.error(err);
		deleteMultipleFilesFromDisk(req.files);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION Create Property End -------------------------------- */

/* --------------------------- SECTION get all properties --------------------------- */
export const getAll = async (req, res) => {
	try {
		const properties = await Listing.find();

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

/* --------------------------- !SECTION get all property end -------------------------- */

/* --------------------------- SECTION get single property -------------------------- */
export const getSingle = async (req, res) => {
	try {
		const { id } = req.params;

		const property = await Listing.findById(id);

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

/* --------------------------- !SECTION get single end -------------------------- */

/* ----------------------------- SECTION update property ---------------------------- */
export const update = async (req, res) => {
	try {
		// ANCHOR get inputs
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
			lobby,
			commission,
			age,
			possession,
			purchaseType,
			constructionStatus,
			location,
			furnishingDetails,
			facilities,
		} = req.body;

		const images = [];
		const videos = [];
		const documents = [];
		const parsedFacilities = [];

		// ANCHOR Validate Inputs

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
			category !== 'Commercial Plot' &&
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

		// validate purchase type
		if (
			purchaseType &&
			purchaseType !== 'New Booking' &&
			purchaseType !== 'Resale'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					"Purchase Type can only be either 'New Booking' or 'Resale'",
				data: {},
			});
		}

		// validate construction status
		if (
			constructionStatus &&
			constructionStatus !== 'Under Construction' &&
			constructionStatus !== 'Ready to Move'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					"Construction Status can only be either 'Under Construction' or 'Ready to Move'",
				data: {},
			});
		}

		// validate furnishing details
		if (
			/**
			 * this will first parse the furnishing details to object
			 *  and than push it's keys to an array and than check if its
			 *  length is greater than 0 so that we can check if object is empty or not
			 */
			Object.keys(JSON.parse(furnishingDetails)).length > 0 &&
			status !== 'Semifurnished' &&
			status !== 'Furnished'
		) {
			deleteMultipleFilesFromDisk(req.files);
			return res.status(400).json({
				success: false,
				message:
					'Furnishing Details can only be filled when Status is either Semifurnished or Furnished',
				data: {},
			});
		}

		// ANCHOR Update Property
		const propertyFromDB = await Listing.findById(id);

		if (req.files.length > 0) {
			// upload files to aws s3
			for (let file of req.files) {
				const response = await uploadFileToS3(file);

				const fileObject = {
					url: response.Location,
					key: response.Key,
				};

				// push file paths to respective arrays
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
		}

		if (facilities.length > 0) {
			facilities.forEach(facility =>
				parsedFacilities.push(JSON.parse(facility))
			);
		}

		// ANCHOR  update property
		const updatedProperty = await Listing.findByIdAndUpdate(
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
				lobby,
				age,
				commission,
				possession,
				purchaseType,
				constructionStatus,
				location,
				facilities: parsedFacilities,
				furnishingDetails: furnishingDetails
					? JSON.parse(furnishingDetails)
					: {},
				images:
					images.length > 0
						? [...propertyFromDB.images, ...images]
						: propertyFromDB.images,
				videos:
					videos.length > 0
						? [...propertyFromDB.videos, ...videos]
						: propertyFromDB.videos,
				documents:
					documents.length > 0
						? [...propertyFromDB.documents, ...documents]
						: propertyFromDB.documents,
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
		logger.error(err);
		deleteMultipleFilesFromDisk(req.files);

		res.status(400).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* ---------------------- !SECTION update property end ---------------------- */

/* ----------------------------- SECTION delete property ---------------------------- */
export const deleteListing = async (req, res) => {
	try {
		const { id } = req.params;

		const listing = await Listing.findById(id);

		const filesArray = [
			...listing.images,
			...listing.documents,
			...listing.videos,
		];

		// delete files from s3
		await deleteMultipleFilesFromS3(filesArray);

		// delete property from DB
		const deletedListing = await Listing.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: 'Property deleted successfully',
			data: deletedListing,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* ----------------------------- !SECTION delete property end ---------------------------- */

/* ----------------------------- SECTION approve listing ---------------------------- */
export const approveListing = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.query;

		// get listing from db
		const listing = await Listing.findById(id);

		// push listing to user's approved listings

		const newPropertyObject = {};

		/**
		 * create property object with loop so that we don't have to write all
		 *  properties while creating property in Property.create() function
		 */
		for (let key in listing) {
			if (key !== '_id' && key !== '__v') {
				newPropertyObject[key] = listing[key];
			}
		}

		// create new property from listing
		const newProperty = await Property.create(newPropertyObject);

		const user = await User.findById(userId);

		const newListings = user.listings.filter(
			listing => listing._id.toString() !== id
		);

		await User.findByIdAndUpdate(userId, {
			listings: newListings,
			properties: [...user.properties, newProperty],
		});

		// delete listing from db
		await Listing.findByIdAndDelete(id);

		// send response
		res.status(201).json({
			success: true,
			message: 'Property approved successfully',
			data: newProperty,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION approve listing end -------------------------------- */

/* -------------------------- SECTION delete specific File -------------------------- */
export const deleteFile = async (req, res) => {
	try {
		const { key, id, type } = req.params;

		const property = await Listing.findById(id);

		// delete files from property
		if (type === 'images') {
			const removedImage = property.images.filter(
				image => image.key !== key
			);

			await Listing.findByIdAndUpdate(
				id,
				{
					images: removedImage,
				},
				{ new: true }
			);
		} else if (type === 'videos') {
			const removedVideo = property.videos.filter(
				video => video.key !== key
			);

			await Listing.findByIdAndUpdate(
				id,
				{
					videos: removedVideo,
				},
				{ new: true }
			);
		}

		// delete file from aws s3
		await deleteSingleFileFromS3(key);

		res.status(200).json({
			success: true,
			message: 'File deleted successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);
		res.status(400).json({
			success: false,
			message: 'Invalid key',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION delete file end -------------------------------- */
