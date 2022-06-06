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
	ApproveListingParams,
	CreateListingBody,
	createListingSchema,
	DeleteListingParams,
	DeleteSpecificFileFromListingParams,
	GetSingleListingParams,
	UpdateListingBody,
	UpdateListingParams,
	updateListingSchema,
} from '../schemas/listing.schema';
import { StatusCodes } from 'http-status-codes';

/* ----------------------------- SECTION add new listing ---------------------------- */
export const createListingHandler = async (
	req: Request<{}, {}, CreateListingBody>,
	res: Response
) => {
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
};

/* -------------------------------- !SECTION Create Property End -------------------------------- */

/* --------------------------- SECTION get all properties --------------------------- */
export const getAllListingsHandler = async (req: Request, res: Response) => {
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
};

/* --------------------------- !SECTION get all property end -------------------------- */

/* --------------------------- SECTION get single property -------------------------- */
export const getSingleListingHandler = async (
	req: Request<GetSingleListingParams>,
	res: Response
) => {
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
};

/* --------------------------- !SECTION get single end -------------------------- */

/* ----------------------------- SECTION update listing ---------------------------- */
export const updateListingHandler = async (
	req: Request<UpdateListingParams, {}, UpdateListingBody>,
	res: Response
) => {
	try {
		// ANCHOR get inputs
		const { id } = req.params;

		const parsedFacilities: Facility[] = [];
		const images: S3File[] = [];
		const videos: S3File[] = [];
		const documents: S3File[] = [];

		// ANCHOR Validate Inputs

		updateListingSchema.body.parse(req.body);
		updateListingSchema.params.parse(req.params);

		// ANCHOR Update Property
		const listingFromDB = await ListingModel.findById(id);

		if (!listingFromDB) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Invalid Id',
				data: {},
			});
		}

		if (req.files && req.files.length > 0) {
			// upload files to aws s3
			for (let file of req.files as MulterFile[]) {
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

		if (req.body.facilities && req.body.facilities.length > 0) {
			req.body.facilities.forEach(facility =>
				parsedFacilities.push(JSON.parse(facility))
			);
		}

		// ANCHOR  update property
		const updatedListing = await ListingModel.findByIdAndUpdate(
			id,
			{
				title: req.body.title,
				description: req.body.description,
				address: req.body.address,
				price: req.body.price,
				specialPrice: req.body.specialPrice,
				size: req.body.size,
				type: req.body.type,
				security: req.body.security,
				maintenance: req.body.maintenance,
				category: req.body.category,
				unit: req.body.unit,
				bedroom: req.body.bedroom,
				bathroom: req.body.bathroom,
				openParking: req.body.openParking,
				closeParking: req.body.closeParking,
				kitchen: req.body.kitchen,
				livingRoom: req.body.livingRoom,
				store: req.body.store,
				balcony: req.body.balcony,
				dinningRoom: req.body.dinningRoom,
				floor: req.body.floor,
				poojaRoom: req.body.poojaRoom,
				direction: req.body.direction,
				status: req.body.status,
				otherFeatures: req.body.otherFeatures,
				lobby: req.body.lobby,
				age: req.body.age,
				commission: req.body.commission,
				possession: req.body.possession,
				purchaseType: req.body.purchaseType,
				constructionStatus: req.body.constructionStatus,
				location: req.body.location,
				locality: req.body.locality,
				facilities: parsedFacilities,
				furnishingDetails: req.body.furnishingDetails
					? JSON.parse(req.body.furnishingDetails)
					: {},
				images:
					images.length > 0
						? [...listingFromDB.images, ...images]
						: listingFromDB.images,
				videos:
					videos.length > 0
						? [...listingFromDB.videos, ...videos]
						: listingFromDB.videos,
				documents:
					documents.length > 0
						? [...listingFromDB.documents, ...documents]
						: listingFromDB.documents,
			},
			{ new: true }
		);

		// send response
		return res.status(StatusCodes.OK).json({
			success: true,
			message:
				'Listing Updated successfully It will be reviewed approved in 24 hours',
			data: updatedListing,
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

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* ---------------------- !SECTION update property end ---------------------- */

/* ----------------------------- SECTION delete property ---------------------------- */
export const deleteListingHandler = async (
	req: Request<DeleteListingParams>,
	res: Response
) => {
	try {
		const { id } = req.params;

		const listing = await ListingModel.findById(id);

		if (!listing) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'listing not found please check id',
				data: {},
			});
		}

		// get user from db
		const user = await UserModel.findById(listing.ownerId.toString());

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'user not found',
				data: {},
			});
		}

		const filesArray = [
			...listing.images,
			...listing.documents,
			...listing.videos,
		];

		// delete files from s3
		await deleteMultipleFilesFromS3(filesArray);

		// delete listing from user
		const newListingArray = user.listings.filter(listing => {
			if (listing) return listing.toString() !== id;
		});

		user.listings = newListingArray;

		// save updated user
		user.save();

		// delete property from DB
		listing.delete();

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Property deleted successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* ----------------------------- !SECTION delete property end ---------------------------- */

/* ----------------------------- SECTION approve listing ---------------------------- */
export const approveListingHandler = async (
	req: Request<ApproveListingParams>,
	res: Response
) => {
	try {
		const { id } = req.params;

		// get listing from db
		const listing = await ListingModel.findById(id);

		if (!listing) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'listing not found',
				data: {},
			});
		}

		const userId = listing.ownerId.toString();

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'user not found check id',
				data: {},
			});
		}

		// push listing to user's approved listings
		const newListingObject = { ...listing.toObject() };

		delete listing._id;
		delete listing.__v;

		// create new property from listing
		const newProperty = await PropertyModel.create(newListingObject);

		const newListings = user.listings.filter(listing => {
			if (listing) {
				return listing.toString() !== id;
			}
		});

		await UserModel.findByIdAndUpdate(userId, {
			listings: newListings,
			properties: [...user.properties, newProperty],
		});

		// delete listing from db
		listing.delete();

		// send response
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'Listing approved successfully',
			data: newProperty,
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION approve listing end -------------------------------- */

/* -------------------------- SECTION delete specific File -------------------------- */
export const deleteSpecificFileFromListingHandler = async (
	req: Request<DeleteSpecificFileFromListingParams>,
	res: Response
) => {
	try {
		const { key, id, type } = req.params;

		const listing = await ListingModel.findById(id);

		if (!listing) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'listing not found',
				data: {},
			});
		}

		// delete files from listing
		if (type === 'images') {
			const newImagesArray = listing.images.filter(
				image => image.key !== key
			);

			listing.images = newImagesArray;

			listing.save();
		} else if (type === 'videos') {
			const newVideosArray = listing.videos.filter(
				video => video.key !== key
			);

			listing.videos = newVideosArray;

			listing.save();
		} else if (type === 'documents') {
			const newDocumentsArray = listing.documents.filter(
				document => document.key !== key
			);

			listing.documents = newDocumentsArray;

			listing.save();
		}

		// delete file from aws s3
		await deleteSingleFileFromS3(key);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'File deleted successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid key',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION delete file end -------------------------------- */
