"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecificFileFromListingSchema = exports.approveListingSchema = exports.deleteListingSchema = exports.updateListingSchema = exports.getSingleListingSchema = exports.createListingSchema = void 0;
const zod_1 = require("zod");
const TYPES = ['Sale', 'Rental', 'PG'];
const CATEGORIES = [
    'Residential Apartment',
    'Independent House/Villa',
    'Plot',
    'Commercial Office',
    'Serviced Apartments',
    '1 RK/ Studio Apartment',
    'Independent/Builder Floor',
    'Other',
];
const STATUS = ['Unfurnished', 'Semifurnished', 'Furnished'];
const UNITS = [
    'Sq. Ft.',
    'Acre',
    'Gaj',
    'Marla',
    'Bigha',
    'Bigha-Pucca',
    'Bigha-Kachha',
    'Biswa',
    'Biswa-Pucca',
    'Kanal',
    'Killa',
    'Kattha',
    'Ghumaon',
];
const POSSESSION = [
    'Immediate',
    'Between 1 Month',
    'Between 2 Month',
    'Between 3 Month',
    'Between 6 Months',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
];
const PURCHASE_TYPE = ['New Booking', 'Resale'];
const CONSTRUCTION_STATUS = ['Ready to Move', 'Under Construction'];
const DIRECTIONS = [
    'North',
    'South',
    'East',
    'West',
    'North-East',
    'North-West',
    'South-East',
    'South-West',
];
exports.createListingSchema = {
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
        price: zod_1.z.string({ required_error: 'price is required' }),
        specialPrice: zod_1.z.string().optional(),
        type: zod_1.z.enum(TYPES),
        category: zod_1.z.enum(CATEGORIES),
        status: zod_1.z.enum(STATUS),
        size: zod_1.z.string({ required_error: 'size is required' }),
        unit: zod_1.z.enum(UNITS),
        bedroom: zod_1.z.string().optional(),
        bathroom: zod_1.z.string().optional(),
        openParking: zod_1.z.string().optional(),
        closeParking: zod_1.z.string().optional(),
        livingRoom: zod_1.z.string().optional(),
        dinningRoom: zod_1.z.string().optional(),
        store: zod_1.z.string().optional(),
        poojaRoom: zod_1.z.string().optional(),
        balcony: zod_1.z.string().optional(),
        floor: zod_1.z.string().optional(),
        direction: zod_1.z.enum(DIRECTIONS).optional(),
        kitchen: zod_1.z.string().optional(),
        otherFeatures: zod_1.z.array(zod_1.z.string()).optional(),
        address: zod_1.z.string({ required_error: 'address is required' }),
        owner: zod_1.z.string({ required_error: 'owner is required' }),
        ownerContact: zod_1.z.string({ required_error: 'ownerContact is required' }),
        ownerId: zod_1.z.string().optional(),
        lobby: zod_1.z.string().optional(),
        commission: zod_1.z.string({ required_error: 'commission is required' }),
        age: zod_1.z.string().optional(),
        possession: zod_1.z.enum(POSSESSION),
        purchaseType: zod_1.z.enum(PURCHASE_TYPE).optional(),
        constructionStatus: zod_1.z.enum(CONSTRUCTION_STATUS).optional(),
        location: zod_1.z.string().optional(),
        locality: zod_1.z.string({ required_error: 'locality is required' }),
        furnishingDetails: zod_1.z.string().optional(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
        security: zod_1.z.string().optional(),
        maintenance: zod_1.z.string().optional(),
    }),
};
exports.getSingleListingSchema = {
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required' }),
    }),
};
exports.updateListingSchema = {
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        specialPrice: zod_1.z.string().optional(),
        type: zod_1.z.enum(TYPES).optional(),
        category: zod_1.z.enum(CATEGORIES).optional(),
        status: zod_1.z.enum(STATUS).optional(),
        size: zod_1.z.string().optional(),
        unit: zod_1.z.enum(UNITS).optional(),
        bedroom: zod_1.z.string().optional(),
        bathroom: zod_1.z.string().optional(),
        openParking: zod_1.z.string().optional(),
        closeParking: zod_1.z.string().optional(),
        livingRoom: zod_1.z.string().optional(),
        dinningRoom: zod_1.z.string().optional(),
        store: zod_1.z.string().optional(),
        poojaRoom: zod_1.z.string().optional(),
        balcony: zod_1.z.string().optional(),
        floor: zod_1.z.string().optional(),
        direction: zod_1.z.enum(DIRECTIONS).optional(),
        kitchen: zod_1.z.string().optional(),
        otherFeatures: zod_1.z.array(zod_1.z.string()).optional(),
        address: zod_1.z.string().optional(),
        owner: zod_1.z.string().optional(),
        ownerContact: zod_1.z.string().optional(),
        lobby: zod_1.z.string().optional(),
        commission: zod_1.z.string().optional(),
        age: zod_1.z.string().optional(),
        possession: zod_1.z.enum(POSSESSION).optional(),
        purchaseType: zod_1.z.enum(PURCHASE_TYPE).optional(),
        constructionStatus: zod_1.z.enum(CONSTRUCTION_STATUS).optional(),
        location: zod_1.z.string().optional(),
        locality: zod_1.z.string().optional(),
        furnishingDetails: zod_1.z.string().optional(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
        security: zod_1.z.string().optional(),
        maintenance: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required' }),
    }),
};
exports.deleteListingSchema = {
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required' }),
    }),
};
exports.approveListingSchema = {
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required' }),
    }),
};
exports.deleteSpecificFileFromListingSchema = {
    params: zod_1.z.object({
        key: zod_1.z.string({ required_error: 'key is required' }),
        id: zod_1.z.string({ required_error: 'id is required' }),
        type: zod_1.z.string({ required_error: 'type is required' }),
    }),
};
