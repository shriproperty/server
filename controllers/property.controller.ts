import { PropertyModel } from '../models/property.model';
import { ListingModel } from '../models/listing.model';
import logger from '../helpers/logger.helper';
import { UserModel } from '../models/user.model';
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
	CreatePropertyBody,
	createPropertySchema,
	DeletePropertyParams,
	DeleteSpecificFileFromPropertyParams,
	GetAllPropertiesQuery,
	GetSinglePropertyParams,
	MovePropertyToListingsParams,
	UpdatePropertyBody,
	UpdatePropertyParams,
	updatePropertySchema,
} from '../schemas/property.schema';
import { StatusCodes } from 'http-status-codes';

interface GetAllPropertiesConditions {
	title?: any;
	price?: {
		$gte: number;
		$lte: number;
	};
	featured?: boolean;
	type?: string;
	status?: string;
	category?: string;
	floor?: string;
	parking?: string;
	bedroom?: string;
	bathroom?: string;
}

/* ----------------------------- SECTION create property ----------------------------- */
export const createPropertyHandler = async (
	req: Request<{}, {}, CreatePropertyBody>,
	res: Response
) => {
	try {
		const parsedFacilities: Facility[] = [];
		const images: S3File[] = [];
		const documents: S3File[] = [];
		const videos: S3File[] = [];

		createPropertySchema.body.parse(req.body);

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

		// create new property
		const property = await PropertyModel.create({
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			specialPrice: req.body.specialPrice,
			type: req.body.type,
			category: req.body.category,
			status: req.body.status,
			size: req.body.size,
			unit: req.body.unit,
			featured: req.body.featured,
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

		// send response
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'Property created successfully',
			data: property,
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

// /* --------------------------- SECTION get all properties --------------------------- */
export const getAllPropertiesHandler = async (
	req: Request<{}, {}, {}, GetAllPropertiesQuery>,
	res: Response
) => {
	try {
		const {
			title,
			price,
			featured,
			type,
			status,
			category,
			floor,
			parking,
			bedroom,
			bathroom,
		} = req.query;

		// minimum and maximum price that exists in db
		const maxPrice = await PropertyModel.find()
			.sort({ price: -1 })
			.limit(1);
		const minPrice = await PropertyModel.find()
			.sort({ price: +1 })
			.limit(1);

		let conditions: GetAllPropertiesConditions = {};

		// ANCHOR Conditions
		if (title) {
			conditions.title = {
				$regex: new RegExp('^' + title.toLowerCase(), 'i'),
			};
		}

		if (featured && featured === 'true') {
			conditions.featured = true;
		}

		if (price && price.split(',').length > 0) {
			const min = price.split(',')[0];
			const max = price.split(',')[1];

			conditions.price = { $gte: +min, $lte: +max };
		}

		if (type) {
			conditions.type = type;
		}

		if (status) {
			conditions.status = status;
		}

		if (category) {
			conditions.category = category;
		}

		if (floor) {
			conditions.floor = floor;
		}

		if (parking) {
			conditions.parking = parking;
		}

		if (bedroom) {
			conditions.bedroom = bedroom;
		}

		if (bathroom) {
			conditions.bathroom = bathroom;
		}

		// ANCHOR get properties from database
		const properties = await PropertyModel.find(conditions);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'All properties fetched successfully',
			data: properties,
			maxPrice: maxPrice.length > 0 ? maxPrice[0].price : 100,
			minPrice: minPrice.length > 0 ? minPrice[0].price : 0,
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

/* ------------------------------ !SECTION Get all property end ------------------------------ */

/* --------------------------- SECTION get single property -------------------------- */
export const getSinglePropertyHandler = async (
	req: Request<GetSinglePropertyParams>,
	res: Response
) => {
	try {
		const { id } = req.params;

		const property = await PropertyModel.findById(id);

		res.status(StatusCodes.OK).json({
			success: true,
			message: 'Property fetched successfully',
			data: property,
		});
	} catch (err) {
		logger.error(err);

		res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* -------------------- !SECTION get single property end -------------------- */

/* ----------------------------- SECTION update property ---------------------------- */
export const updatePropertyHandler = async (
	req: Request<UpdatePropertyParams, {}, UpdatePropertyBody>,
	res: Response
) => {
	try {
		// ANCHOR get inputs
		const { id } = req.params;

		const parsedFacilities: Facility[] = [];
		const images: S3File[] = [];
		const videos: S3File[] = [];
		const documents: S3File[] = [];

		updatePropertySchema.body.parse(req.body);
		updatePropertySchema.params.parse(req.params);

		// ANCHOR Update Property
		const propertyFromDB = await PropertyModel.findById(id);

		if (!propertyFromDB) {
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
		const updatedProperty = await PropertyModel.findByIdAndUpdate(
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
				featured: req.body.featured,
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
		res.status(StatusCodes.OK).json({
			success: true,
			message: 'Property updated successfully',
			data: updatedProperty,
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

		res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid Id',
			data: {},
		});
	}
};

/* ---------------------- !SECTION update property end ---------------------- */

/* ----------------------------- SECTION delete property ---------------------------- */
export const deletePropertyHandler = async (
	req: Request<DeletePropertyParams>,
	res: Response
) => {
	try {
		const { id } = req.params;

		const property = await PropertyModel.findById(id);

		if (!property) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Invalid Id',
				data: {},
			});
		}

		const filesArray = [
			...property.images,
			...property.documents,
			...property.videos,
		];

		// delete files from s3

		await deleteMultipleFilesFromS3(filesArray);

		// get property owner from database
		if (property.ownerId) {
			const user = (await UserModel.findById(
				property.ownerId.toString()
			)) as User;

			const newPropertyList = user.properties.filter(prop => {
				if (prop) {
					return prop.toString() !== property._id.toString();
				}
			});

			await UserModel.findByIdAndUpdate(user._id, {
				properties: newPropertyList,
			});
		}

		// delete property from DB
		const deletedProperty = await PropertyModel.findByIdAndDelete(id);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Property deleted successfully',
			data: deletedProperty,
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

/* -------------------------------- !SECTION delete property end -------------------------------- */

/* -------------------------- SECTION delete specific File -------------------------- */
export const deleteSpecificFileFromPropertyHandler = async (
	req: Request<DeleteSpecificFileFromPropertyParams>,
	res: Response
) => {
	try {
		const { key, id, type } = req.params;

		const property = await PropertyModel.findById(id);

		if (!property) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Invalid Id',
				data: {},
			});
		}

		// delete files from property
		if (type === 'images') {
			const newImagesArray = property.images.filter(
				image => image.key !== key
			);

			property.images = newImagesArray;

			property.save();
		} else if (type === 'videos') {
			const newVideosArray = property.videos.filter(
				video => video.key !== key
			);

			property.videos = newVideosArray;

			property.save();
		} else if (type === 'documents') {
			const newDocumentsArray = property.documents.filter(
				document => document.key !== key
			);

			property.documents = newDocumentsArray;

			property.save();
		}

		// delete file from aws s3
		await deleteSingleFileFromS3(key);

		res.status(StatusCodes.OK).json({
			success: true,
			message: 'File deleted successfully',
			data: {},
		});
	} catch (err) {
		logger.error(err);

		res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Invalid key',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION delete file end -------------------------------- */

/* --------------------------------- SECTION move property to listings to approve them -------------------------------- */
export const movePropertyToListingsHandler = async (
	req: Request<MovePropertyToListingsParams>,
	res: Response
) => {
	try {
		const { id } = req.params;

		// get property from db
		const property = await PropertyModel.findById(id);

		if (!property) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Invalid Id',
				data: {},
			});
		}

		const userId = property.ownerId.toString();

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'User Not Found',
				data: {},
			});
		}

		// push listing to user's pending listings
		const newPropertyObject = { ...property.toObject() };

		delete newPropertyObject._id;
		delete newPropertyObject.__v;

		// create new property from listing
		const newListing = await ListingModel.create(newPropertyObject);

		const newProperties = user.properties.filter(prop => {
			if (prop) {
				return prop.toString() !== id;
			}
		});

		await UserModel.findByIdAndUpdate(userId, {
			listings: [...user.listings, newListing],
			properties: newProperties,
		});

		// delete listing from db
		await PropertyModel.findByIdAndDelete(id);

		// send response
		res.status(StatusCodes.OK).json({
			success: true,
			message: 'Property moved to listings',
			data: newListing,
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal server error',
			data: {},
		});
	}
};

/* -------------------------------- !SECTION -------------------------------- */
