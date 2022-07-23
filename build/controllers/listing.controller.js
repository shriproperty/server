"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecificFileFromListingHandler = exports.approveListingHandler = exports.deleteListingHandler = exports.updateListingHandler = exports.getSingleListingHandler = exports.getAllListingsHandler = exports.createListingHandler = void 0;
const listing_model_1 = require("../models/listing.model");
const property_model_1 = require("../models/property.model");
const user_model_1 = require("../models/user.model");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const zod_1 = require("zod");
const deleteFiles_helper_1 = require("../helpers/deleteFiles.helper");
const s3_helper_1 = require("../helpers/s3.helper");
const listing_schema_1 = require("../schemas/listing.schema");
const http_status_codes_1 = require("http-status-codes");
/* ----------------------------- SECTION add new listing ---------------------------- */
const createListingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ANCHOR Get Inputs
        const parsedFacilities = [];
        const images = [];
        const documents = [];
        const videos = [];
        listing_schema_1.createListingSchema.body.parse(req.body);
        // ANCHOR Create Property
        // upload files to aws s3
        for (let file of req.files) {
            const response = yield (0, s3_helper_1.uploadFileToS3)(file);
            const fileObject = { url: response.Location, key: response.Key };
            // push file paths to respective arrays
            if (file.fieldname === 'images') {
                images.push(fileObject);
            }
            else if (file.fieldname === 'videos') {
                videos.push(fileObject);
            }
            else if (file.fieldname === 'documents') {
                documents.push(fileObject);
            }
            // delete files from uploads folder
            (0, deleteFiles_helper_1.deleteSingleFileFromDisk)(file.path);
        }
        // Parse Facilities
        if (req.body.facilities && req.body.facilities.length > 0) {
            req.body.facilities.forEach(facility => parsedFacilities.push(JSON.parse(facility)));
        }
        // get user from database
        const user = yield user_model_1.UserModel.findById(res.locals.user);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found',
                data: {},
            });
        }
        // create new property
        const listing = yield listing_model_1.ListingModel.create({
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
        yield user_model_1.UserModel.findByIdAndUpdate(res.locals.user, {
            listings: [...user.listings, listing._id],
        });
        // send response
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: 'Listing Add successfully It will be reviewed approved in 24 hours',
            data: listing,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        if (err) {
            (0, deleteFiles_helper_1.deleteMultipleFilesFromDisk)(req.files);
        }
        if (err instanceof zod_1.z.ZodError) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: err.flatten(),
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            data: {},
        });
    }
});
exports.createListingHandler = createListingHandler;
/* -------------------------------- !SECTION Create Property End -------------------------------- */
/* --------------------------- SECTION get all properties --------------------------- */
const getAllListingsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield listing_model_1.ListingModel.find();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'All properties fetched successfully',
            data: properties,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            data: {},
        });
    }
});
exports.getAllListingsHandler = getAllListingsHandler;
/* --------------------------- !SECTION get all property end -------------------------- */
/* --------------------------- SECTION get single property -------------------------- */
const getSingleListingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield listing_model_1.ListingModel.findById(id);
        if (!property) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Property not found',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Property fetched successfully',
            data: property,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid Id',
            data: {},
        });
    }
});
exports.getSingleListingHandler = getSingleListingHandler;
/* --------------------------- !SECTION get single end -------------------------- */
/* ----------------------------- SECTION update listing ---------------------------- */
const updateListingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ANCHOR get inputs
        const { id } = req.params;
        const parsedFacilities = [];
        const images = [];
        const videos = [];
        const documents = [];
        // ANCHOR Validate Inputs
        listing_schema_1.updateListingSchema.body.parse(req.body);
        listing_schema_1.updateListingSchema.params.parse(req.params);
        // ANCHOR Update Property
        const listingFromDB = yield listing_model_1.ListingModel.findById(id);
        if (!listingFromDB) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Invalid Id',
                data: {},
            });
        }
        if (req.files && req.files.length > 0) {
            // upload files to aws s3
            for (let file of req.files) {
                const response = yield (0, s3_helper_1.uploadFileToS3)(file);
                const fileObject = {
                    url: response.Location,
                    key: response.Key,
                };
                // push file paths to respective arrays
                if (file.fieldname === 'images') {
                    images.push(fileObject);
                }
                else if (file.fieldname === 'videos') {
                    videos.push(fileObject);
                }
                else if (file.fieldname === 'documents') {
                    documents.push(fileObject);
                }
                // delete files from uploads folder
                (0, deleteFiles_helper_1.deleteSingleFileFromDisk)(file.path);
            }
        }
        if (req.body.facilities && req.body.facilities.length > 0) {
            req.body.facilities.forEach(facility => parsedFacilities.push(JSON.parse(facility)));
        }
        // ANCHOR  update property
        const updatedListing = yield listing_model_1.ListingModel.findByIdAndUpdate(id, {
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
            images: images.length > 0
                ? [...listingFromDB.images, ...images]
                : listingFromDB.images,
            videos: videos.length > 0
                ? [...listingFromDB.videos, ...videos]
                : listingFromDB.videos,
            documents: documents.length > 0
                ? [...listingFromDB.documents, ...documents]
                : listingFromDB.documents,
        }, { new: true });
        // send response
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Listing Updated successfully It will be reviewed approved in 24 hours',
            data: updatedListing,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        if (err) {
            (0, deleteFiles_helper_1.deleteMultipleFilesFromDisk)(req.files);
        }
        if (err instanceof zod_1.z.ZodError) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: err.flatten(),
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid Id',
            data: {},
        });
    }
});
exports.updateListingHandler = updateListingHandler;
/* ---------------------- !SECTION update property end ---------------------- */
/* ----------------------------- SECTION delete property ---------------------------- */
const deleteListingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listing = yield listing_model_1.ListingModel.findById(id);
        if (!listing) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'listing not found please check id',
                data: {},
            });
        }
        // get user from db
        const user = yield user_model_1.UserModel.findById(listing.ownerId.toString());
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
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
        yield (0, s3_helper_1.deleteMultipleFilesFromS3)(filesArray);
        // delete listing from user
        const newListingArray = user.listings.filter(listing => {
            if (listing)
                return listing.toString() !== id;
        });
        user.listings = newListingArray;
        // save updated user
        user.save();
        // delete property from DB
        listing.delete();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Property deleted successfully',
            data: {},
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid Id',
            data: {},
        });
    }
});
exports.deleteListingHandler = deleteListingHandler;
/* ----------------------------- !SECTION delete property end ---------------------------- */
/* ----------------------------- SECTION approve listing ---------------------------- */
const approveListingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // get listing from db
        const listing = yield listing_model_1.ListingModel.findById(id);
        if (!listing) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'listing not found',
                data: {},
            });
        }
        const userId = listing.ownerId.toString();
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'user not found check id',
                data: {},
            });
        }
        // push listing to user's approved listings
        const newListingObject = Object.assign({}, listing.toObject());
        delete listing._id;
        delete listing.__v;
        // create new property from listing
        const newProperty = yield property_model_1.PropertyModel.create(newListingObject);
        const newListings = user.listings.filter(listing => {
            if (listing) {
                return listing.toString() !== id;
            }
        });
        yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            listings: newListings,
            properties: [...user.properties, newProperty],
        });
        // delete listing from db
        listing.delete();
        // send response
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: 'Listing approved successfully',
            data: newProperty,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid Id',
            data: {},
        });
    }
});
exports.approveListingHandler = approveListingHandler;
/* -------------------------------- !SECTION approve listing end -------------------------------- */
/* -------------------------- SECTION delete specific File -------------------------- */
const deleteSpecificFileFromListingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key, id, type } = req.params;
        const listing = yield listing_model_1.ListingModel.findById(id);
        if (!listing) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'listing not found',
                data: {},
            });
        }
        // delete files from listing
        if (type === 'images') {
            const newImagesArray = listing.images.filter(image => image.key !== key);
            listing.images = newImagesArray;
            listing.save();
        }
        else if (type === 'videos') {
            const newVideosArray = listing.videos.filter(video => video.key !== key);
            listing.videos = newVideosArray;
            listing.save();
        }
        else if (type === 'documents') {
            const newDocumentsArray = listing.documents.filter(document => document.key !== key);
            listing.documents = newDocumentsArray;
            listing.save();
        }
        // delete file from aws s3
        yield (0, s3_helper_1.deleteSingleFileFromS3)(key);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'File deleted successfully',
            data: {},
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid key',
            data: {},
        });
    }
});
exports.deleteSpecificFileFromListingHandler = deleteSpecificFileFromListingHandler;
/* -------------------------------- !SECTION delete file end -------------------------------- */
