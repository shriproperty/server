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
exports.movePropertyToListingsHandler = exports.deleteSpecificFileFromPropertyHandler = exports.deletePropertyHandler = exports.updatePropertyHandler = exports.getSinglePropertyHandler = exports.getAllPropertiesHandler = exports.createPropertyHandler = void 0;
const property_model_1 = require("../models/property.model");
const listing_model_1 = require("../models/listing.model");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
const deleteFiles_helper_1 = require("../helpers/deleteFiles.helper");
const s3_helper_1 = require("../helpers/s3.helper");
const property_schema_1 = require("../schemas/property.schema");
const http_status_codes_1 = require("http-status-codes");
/* ----------------------------- SECTION create property ----------------------------- */
const createPropertyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedFacilities = [];
        const images = [];
        const documents = [];
        const videos = [];
        property_schema_1.createPropertySchema.body.parse(req.body);
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
        // create new property
        const property = yield property_model_1.PropertyModel.create({
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
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: 'Property created successfully',
            data: property,
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
exports.createPropertyHandler = createPropertyHandler;
/* -------------------------------- !SECTION Create Property End -------------------------------- */
// /* --------------------------- SECTION get all properties --------------------------- */
const getAllPropertiesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, featured, type, status, category, floor, parking, bedroom, bathroom, } = req.query;
        // minimum and maximum price that exists in db
        const maxPrice = yield property_model_1.PropertyModel.find()
            .sort({ price: -1 })
            .limit(1);
        const minPrice = yield property_model_1.PropertyModel.find()
            .sort({ price: +1 })
            .limit(1);
        let conditions = {};
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
        const properties = yield property_model_1.PropertyModel.find(conditions);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'All properties fetched successfully',
            data: properties,
            maxPrice: maxPrice.length > 0 ? maxPrice[0].price : 100,
            minPrice: minPrice.length > 0 ? minPrice[0].price : 0,
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
exports.getAllPropertiesHandler = getAllPropertiesHandler;
/* ------------------------------ !SECTION Get all property end ------------------------------ */
/* --------------------------- SECTION get single property -------------------------- */
const getSinglePropertyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield property_model_1.PropertyModel.findById(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Property fetched successfully',
            data: property,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid Id',
            data: {},
        });
    }
});
exports.getSinglePropertyHandler = getSinglePropertyHandler;
/* -------------------- !SECTION get single property end -------------------- */
/* ----------------------------- SECTION update property ---------------------------- */
const updatePropertyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ANCHOR get inputs
        const { id } = req.params;
        const parsedFacilities = [];
        const images = [];
        const videos = [];
        const documents = [];
        property_schema_1.updatePropertySchema.body.parse(req.body);
        property_schema_1.updatePropertySchema.params.parse(req.params);
        // ANCHOR Update Property
        const propertyFromDB = yield property_model_1.PropertyModel.findById(id);
        if (!propertyFromDB) {
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
        const updatedProperty = yield property_model_1.PropertyModel.findByIdAndUpdate(id, {
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
            images: images.length > 0
                ? [...propertyFromDB.images, ...images]
                : propertyFromDB.images,
            videos: videos.length > 0
                ? [...propertyFromDB.videos, ...videos]
                : propertyFromDB.videos,
            documents: documents.length > 0
                ? [...propertyFromDB.documents, ...documents]
                : propertyFromDB.documents,
        }, { new: true });
        // send response
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Property updated successfully',
            data: updatedProperty,
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
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid Id',
            data: {},
        });
    }
});
exports.updatePropertyHandler = updatePropertyHandler;
/* ---------------------- !SECTION update property end ---------------------- */
/* ----------------------------- SECTION delete property ---------------------------- */
const deletePropertyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const property = yield property_model_1.PropertyModel.findById(id);
        if (!property) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
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
        yield (0, s3_helper_1.deleteMultipleFilesFromS3)(filesArray);
        // get property owner from database
        if (property.ownerId) {
            const user = (yield user_model_1.UserModel.findById(property.ownerId.toString()));
            const newPropertyList = user.properties.filter(prop => {
                if (prop) {
                    return prop.toString() !== property._id.toString();
                }
            });
            yield user_model_1.UserModel.findByIdAndUpdate(user._id, {
                properties: newPropertyList,
            });
        }
        // delete property from DB
        const deletedProperty = yield property_model_1.PropertyModel.findByIdAndDelete(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Property deleted successfully',
            data: deletedProperty,
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
exports.deletePropertyHandler = deletePropertyHandler;
/* -------------------------------- !SECTION delete property end -------------------------------- */
/* -------------------------- SECTION delete specific File -------------------------- */
const deleteSpecificFileFromPropertyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key, id, type } = req.params;
        const property = yield property_model_1.PropertyModel.findById(id);
        if (!property) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Invalid Id',
                data: {},
            });
        }
        // delete files from property
        if (type === 'images') {
            const newImagesArray = property.images.filter(image => image.key !== key);
            property.images = newImagesArray;
            property.save();
        }
        else if (type === 'videos') {
            const newVideosArray = property.videos.filter(video => video.key !== key);
            property.videos = newVideosArray;
            property.save();
        }
        else if (type === 'documents') {
            const newDocumentsArray = property.documents.filter(document => document.key !== key);
            property.documents = newDocumentsArray;
            property.save();
        }
        // delete file from aws s3
        yield (0, s3_helper_1.deleteSingleFileFromS3)(key);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'File deleted successfully',
            data: {},
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Invalid key',
            data: {},
        });
    }
});
exports.deleteSpecificFileFromPropertyHandler = deleteSpecificFileFromPropertyHandler;
/* -------------------------------- !SECTION delete file end -------------------------------- */
/* --------------------------------- SECTION move property to listings to approve them -------------------------------- */
const movePropertyToListingsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // get property from db
        const property = yield property_model_1.PropertyModel.findById(id);
        if (!property) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Invalid Id',
                data: {},
            });
        }
        const userId = property.ownerId.toString();
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User Not Found',
                data: {},
            });
        }
        // push listing to user's pending listings
        const newPropertyObject = Object.assign({}, property.toObject());
        delete newPropertyObject._id;
        delete newPropertyObject.__v;
        // create new property from listing
        const newListing = yield listing_model_1.ListingModel.create(newPropertyObject);
        const newProperties = user.properties.filter(prop => {
            if (prop) {
                return prop.toString() !== id;
            }
        });
        yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            listings: [...user.listings, newListing],
            properties: newProperties,
        });
        // delete listing from db
        yield property_model_1.PropertyModel.findByIdAndDelete(id);
        // send response
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Property moved to listings',
            data: newListing,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            data: {},
        });
    }
});
exports.movePropertyToListingsHandler = movePropertyToListingsHandler;
/* -------------------------------- !SECTION -------------------------------- */
