import { ListingModel } from '../models/listing.model';
import { PropertyModel } from '../models/property.model';
import { UserModel } from '../models/user.model';
import logger from '../helpers/logger.helper';
import { z } from 'zod';

import {
	deleteMultipleFilesFromDisk,
	deleteSingleFileFromDisk,
} from '../helpers/deleteFiles.helper';

import {
	uploadFileToS3,
	deleteMultipleFilesFromS3,
	deleteSingleFileFromS3,
} from '../helpers/s3.helper';

import { Request, Response } from 'express';
import {
	CreateListingBody,
	createListingSchema,
	GetSingleListingParams,
} from '../schemas/listing.schema';
import { StatusCodes } from 'http-status-codes';

/* ----------------------------- SECTION add new listing ---------------------------- */
export async function createListingHandler(
	req: Request<{}, {}, CreateListingBody>,
	res: Response
) {
	try {
		// ANCHOR Get Inputs

		const parsedFacilities: Facility[] = [];
		const images: S3File[] = [];
		const documents: S3File[] = [];
		const videos: S3File[] = [];

		createListingSchema.body.parse(req.body);

		// ANCHOR Create Property

		// upload files to aws s3

		for (let file of req.files as MulterFile[]) {
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
		if (req.body.facilities && req.body.facilities.length > 0) {
			req.body.facilities.forEach(facility =>
				parsedFacilities.push(JSON.parse(facility))
			);
		}

		// get user from database
		const user = await UserModel.findById(res.locals.user);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User not found',
				data: {},
			});
		}

		// create new property
		const listing = await ListingModel.create({
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			specialPrice: req.body.specialPrice,
			type: req.body.type,
			category: req.body.category,
			status: req.body.status,
			size: req.body.size,
			unit: req.body.unit,
			bedroom: req.body.bedroom,
			bathroom: req.body.bathroom,
			openParking: req.body.openParking,
			closeParking: req.body.closeParking,
			livingRoom: req.body.livingRoom,
			dinningRoom: req.body.dinningRoom,
			store: req.body.store,
			poojaRoom: req.body.poojaRoom,
			balcony: req.body.balcony,
			floor: req.body.floor,
			direction: req.body.direction,
			kitchen: req.body.kitchen,
			otherFeatures: req.body.otherFeatures,
			address: req.body.address,
			owner: req.body.owner,
			ownerContact: req.body.ownerContact,
			ownerId: res.locals.user,
			lobby: req.body.lobby,
			commission: req.body.commission,
			age: req.body.age,
			possession: req.body.possession,
			purchaseType: req.body.purchaseType,
			constructionStatus: req.body.constructionStatus,
			location: req.body.location,
			locality: req.body.locality,
			facilities: parsedFacilities,
			security: req.body.security,
			maintenance: req.body.maintenance,
			furnishingDetails: req.body.furnishingDetails
				? JSON.parse(req.body.furnishingDetails)
				: {},
			images,
			documents,
			videos,
		});

		await UserModel.findByIdAndUpdate(res.locals.user, {
			listings: [...user.listings, listing._id],
		});

		// send response
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message:
				'Listing Add successfully It will be reviewed approved in 24 hours',
			data: listing,
		});
	} catch (err) {
		logger.error(err);

		if (err) {
			deleteMultipleFilesFromDisk(req.files as MulterFile[]);
		}

		if (err instanceof z.ZodError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: err.flatten(),
				data: {},
			});
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
}

/* -------------------------------- !SECTION Create Property End -------------------------------- */

/* --------------------------- SECTION get all properties --------------------------- */
export async function getAllListingsHandler(req: Request, res: Response) {
	try {
		const properties = await ListingModel.find();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'All properties fetched successfully',
			data: properties,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal Server Error',
			data: {},
		});
	}
}

/* --------------------------- !SECTION get all property end -------------------------- */

/* --------------------------- SECTION get single property -------------------------- */
export async function getSingleListingHandler(
	req: Request<GetSingleListingParams>,
	res: Response
) {
	try {
		const { id } = req.params;

		const property = await ListingModel.findById(id);

		if (!property) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Property not found',
				data: {},
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Property fetched successfully',
			data: property,
		});
	} catch (err) {
		logger.error(err);
		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
}

// /* --------------------------- !SECTION get single end -------------------------- */

// /* ----------------------------- SECTION update property ---------------------------- */
// export const update = async (req, res) => {
// 	try {
// 		// ANCHOR get inputs
// 		const { id } = req.params;

// 		const {
// 			title,
// 			description,
// 			address,
// 			price,
// 			specialPrice,
// 			size,
// 			type,
// 			security,
// 			maintenance,
// 			category,
// 			unit,
// 			bedroom,
// 			bathroom,
// 			openParking,
// 			closeParking,
// 			kitchen,
// 			livingRoom,
// 			store,
// 			balcony,
// 			dinningRoom,
// 			floor,
// 			poojaRoom,
// 			direction,
// 			status,
// 			featured,
// 			otherFeatures,
// 			lobby,
// 			commission,
// 			age,
// 			possession,
// 			purchaseType,
// 			constructionStatus,
// 			location,
// 			locality,
// 			furnishingDetails,
// 			facilities,
// 		} = req.body;

// 		const images = [];
// 		const videos = [];
// 		const documents = [];
// 		const parsedFacilities = [];

// 		// ANCHOR Validate Inputs

// 		// validate type
// 		if (type !== 'Rental' && type !== 'Sale' && type !== 'PG') {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message: 'Type must be either Rental or Sale',
// 				data: {},
// 			});
// 		}

// 		// validate category
// 		if (
// 			category !== 'Residential Apartment' &&
// 			category !== 'Independent House/Villa' &&
// 			category !== 'Plot' &&
// 			category !== 'Commercial Office' &&
// 			category !== 'Commercial Plot' &&
// 			category !== 'Serviced Apartments' &&
// 			category !== '1 RK/ Studio Apartment' &&
// 			category !== 'Independent/Builder Floor' &&
// 			category !== 'Other'
// 		) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message:
// 					'category can only be one of the following: Residential Apartment, Independent House/Villa, Plot, Commercial Office, Serviced Apartments, 1 RK/ Studio Apartment, Independent/Builder Floor, Other',
// 				data: {},
// 			});
// 		}

// 		// validate status
// 		if (
// 			status !== 'Unfurnished' &&
// 			status !== 'Semifurnished' &&
// 			status !== 'Furnished' &&
// 			status !== null
// 		) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message:
// 					'Status can only be one of the following: Unfurnished, Semifurnished, Furnished, null',
// 				data: {},
// 			});
// 		}

// 		if (
// 			unit !== 'Sq. Ft.' &&
// 			unit !== 'Acre' &&
// 			unit !== 'Gaj' &&
// 			unit !== 'Marla' &&
// 			unit !== 'Bigha' &&
// 			unit !== 'Bigha-Pucca' &&
// 			unit !== 'Bigha-Kachha' &&
// 			unit !== 'Biswa' &&
// 			unit !== 'Biswa-Pucca' &&
// 			unit !== 'Kanal' &&
// 			unit !== 'Killa' &&
// 			unit !== 'Kattha' &&
// 			unit !== 'Ghumaon'
// 		) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message: 'Unit can only be "sq" or "marla"',
// 			});
// 		}

// 		// validate featured
// 		if (featured !== 'true' && featured !== 'false') {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message: 'Featured can only be true or false',
// 			});
// 		}

// 		// validate direction
// 		if (
// 			direction !== 'North' &&
// 			direction !== 'South' &&
// 			direction !== 'East' &&
// 			direction !== 'West' &&
// 			direction !== 'North-East' &&
// 			direction !== 'North-West' &&
// 			direction !== 'South-East' &&
// 			direction !== 'South-West'
// 		) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message:
// 					'Direction can only be one of the following: North, South, East, West, North-East, North-West, South-East, South-West',
// 				data: {},
// 			});
// 		}

// 		// validate purchase type
// 		if (
// 			purchaseType &&
// 			purchaseType !== 'New Booking' &&
// 			purchaseType !== 'Resale'
// 		) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message:
// 					"Purchase Type can only be either 'New Booking' or 'Resale'",
// 				data: {},
// 			});
// 		}

// 		// validate construction status
// 		if (
// 			constructionStatus &&
// 			constructionStatus !== 'Under Construction' &&
// 			constructionStatus !== 'Ready to Move'
// 		) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message:
// 					"Construction Status can only be either 'Under Construction' or 'Ready to Move'",
// 				data: {},
// 			});
// 		}
// 		// validate security and maintenance
// 		if (type === 'Sale' && (security || maintenance)) {
// 			deleteMultipleFilesFromDisk(req.files);
// 			return res.status(400).json({
// 				success: false,
// 				message:
// 					"You can't fill 'maintenance' and 'security' field if type is 'Sale'",
// 			});
// 		}

// 		// ANCHOR Update Property
// 		const propertyFromDB = await Listing.findById(id);

// 		if (req.files.length > 0) {
// 			// upload files to aws s3
// 			for (let file of req.files) {
// 				const response = await uploadFileToS3(file);

// 				const fileObject = {
// 					url: response.Location,
// 					key: response.Key,
// 				};

// 				// push file paths to respective arrays
// 				if (file.fieldname === 'images') {
// 					images.push(fileObject);
// 				} else if (file.fieldname === 'videos') {
// 					videos.push(fileObject);
// 				} else if (file.fieldname === 'documents') {
// 					documents.push(fileObject);
// 				}

// 				// delete files from uploads folder
// 				deleteSingleFileFromDisk(file.path);
// 			}
// 		}

// 		if (facilities && facilities.length > 0) {
// 			facilities.forEach(facility =>
// 				parsedFacilities.push(JSON.parse(facility))
// 			);
// 		}

// 		// ANCHOR  update property
// 		const updatedProperty = await Listing.findByIdAndUpdate(
// 			id,
// 			{
// 				title,
// 				description,
// 				address,
// 				price,
// 				specialPrice,
// 				size,
// 				type,
// 				security,
// 				maintenance,
// 				category,
// 				unit,
// 				bedroom,
// 				bathroom,
// 				openParking,
// 				closeParking,
// 				kitchen,
// 				livingRoom,
// 				store,
// 				balcony,
// 				dinningRoom,
// 				floor,
// 				poojaRoom,
// 				direction,
// 				status,
// 				featured,
// 				otherFeatures,
// 				lobby,
// 				age,
// 				commission,
// 				possession,
// 				purchaseType,
// 				constructionStatus,
// 				location,
// 				locality,
// 				facilities: parsedFacilities,
// 				furnishingDetails: furnishingDetails
// 					? JSON.parse(furnishingDetails)
// 					: {},
// 				images:
// 					images.length > 0
// 						? [...propertyFromDB.images, ...images]
// 						: propertyFromDB.images,
// 				videos:
// 					videos.length > 0
// 						? [...propertyFromDB.videos, ...videos]
// 						: propertyFromDB.videos,
// 				documents:
// 					documents.length > 0
// 						? [...propertyFromDB.documents, ...documents]
// 						: propertyFromDB.documents,
// 			},
// 			{ new: true }
// 		);

// 		// send response
// 		res.status(200).json({
// 			success: true,
// 			message:
// 				'Listing Updated successfully It will be reviewed approved in 24 hours',
// 			data: updatedProperty,
// 		});
// 	} catch (err) {
// 		logger.error(err);
// 		deleteMultipleFilesFromDisk(req.files);

// 		res.status(400).json({
// 			success: false,
// 			message: 'Invalid Id',
// 			data: {},
// 		});
// 	}
// };

// /* ---------------------- !SECTION update property end ---------------------- */

// /* ----------------------------- SECTION delete property ---------------------------- */
// export const deleteListing = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		const listing = await Listing.findById(id);

// 		const filesArray = [
// 			...listing.images,
// 			...listing.documents,
// 			...listing.videos,
// 		];

// 		// delete files from s3
// 		await deleteMultipleFilesFromS3(filesArray);

// 		// delete listing from user
// 		const user = await User.findById(listing.ownerId.toString());

// 		const newListingArray = user.listings.filter(
// 			listing => listing.toString() !== id
// 		);

// 		await User.findByIdAndUpdate(user._id, {
// 			listings: newListingArray,
// 		});

// 		// delete property from DB
// 		const deletedListing = await Listing.findByIdAndDelete(id);

// 		res.status(200).json({
// 			success: true,
// 			message: 'Property deleted successfully',
// 			data: deletedListing,
// 		});
// 	} catch (err) {
// 		logger.error(err);
// 		res.status(404).json({
// 			success: false,
// 			message: 'Invalid Id',
// 			data: {},
// 		});
// 	}
// };

// /* ----------------------------- !SECTION delete property end ---------------------------- */

// /* ----------------------------- SECTION approve listing ---------------------------- */
// export const approveListing = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		// get listing from db
// 		const listing = await Listing.findById(id);

// 		const userId = listing.ownerId.toString();

// 		// push listing to user's approved listings

// 		const newPropertyObject = {};

// 		/**
// 		 * create property object with loop so that we don't have to write all
// 		 *  properties while creating property in Property.create() function
// 		 */
// 		for (let key in listing) {
// 			if (key !== '_id' && key !== '__v') {
// 				newPropertyObject[key] = listing[key];
// 			}
// 		}

// 		// create new property from listing
// 		const newProperty = await Property.create(newPropertyObject);

// 		const user = await User.findById(userId);

// 		const newListings = user.listings.filter(
// 			listing => listing._id.toString() !== id
// 		);

// 		await User.findByIdAndUpdate(userId, {
// 			listings: newListings,
// 			properties: [...user.properties, newProperty],
// 		});

// 		// delete listing from db
// 		await Listing.findByIdAndDelete(id);

// 		// send response
// 		res.status(201).json({
// 			success: true,
// 			message: 'Property approved successfully',
// 			data: newProperty,
// 		});
// 	} catch (err) {
// 		logger.error(err);
// 		res.status(404).json({
// 			success: false,
// 			message: 'Invalid Id',
// 			data: {},
// 		});
// 	}
// };

// /* -------------------------------- !SECTION approve listing end -------------------------------- */

// /* -------------------------- SECTION delete specific File -------------------------- */
// export const deleteFile = async (req, res) => {
// 	try {
// 		const { key, id, type } = req.params;

// 		const property = await Listing.findById(id);

// 		// delete files from property
// 		if (type === 'images') {
// 			const removedImage = property.images.filter(
// 				image => image.key !== key
// 			);

// 			await Listing.findByIdAndUpdate(
// 				id,
// 				{
// 					images: removedImage,
// 				},
// 				{ new: true }
// 			);
// 		} else if (type === 'videos') {
// 			const removedVideo = property.videos.filter(
// 				video => video.key !== key
// 			);

// 			await Listing.findByIdAndUpdate(
// 				id,
// 				{
// 					videos: removedVideo,
// 				},
// 				{ new: true }
// 			);
// 		}

// 		// delete file from aws s3
// 		await deleteSingleFileFromS3(key);

// 		res.status(200).json({
// 			success: true,
// 			message: 'File deleted successfully',
// 			data: {},
// 		});
// 	} catch (err) {
// 		logger.error(err);
// 		res.status(400).json({
// 			success: false,
// 			message: 'Invalid key',
// 			data: {},
// 		});
// 	}
// };

// /* -------------------------------- !SECTION delete file end -------------------------------- */
