"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingModel = exports.Listing = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
class Listing {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "specialPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: ['Rental', 'Sale', 'PG'], default: 'Sale' }),
    __metadata("design:type", String)
], Listing.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: [
            'Residential Apartment',
            'Independent House/Villa',
            'Plot',
            'Commercial Office',
            'Serviced Apartments',
            '1 RK/ Studio Apartment',
            'Independent/Builder Floor',
            'Other',
        ],
        default: 'Independent/Builder Floor',
    }),
    __metadata("design:type", String)
], Listing.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "security", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "maintenance", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: ['Unfurnished', 'Semifurnished', 'Furnished'],
        default: 'Unfurnished',
    }),
    __metadata("design:type", String)
], Listing.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Listing.prototype, "featured", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "size", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: [
            'Sq. Ft.',
            'Acre',
            'Gaj',
            'Marla',
            'Bigha',
            'Bigha-Pucca',
            'Bigha-Kachha',
            'Biswa',
            'Biswa–Pucca',
            'Kanal',
            'Killa',
            'Kattha',
            'Ghumaon',
        ],
    }),
    __metadata("design:type", String)
], Listing.prototype, "unit", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "bedroom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "bathroom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "kitchen", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "openParking", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "closeParking", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "livingRoom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "store", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "balcony", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "dinningRoom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "floor", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "poojaRoom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Listing.prototype, "otherFeatures", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "lobby", void 0);
__decorate([
    (0, typegoose_1.prop)({
        enum: [
            'North',
            'South',
            'East',
            'West',
            'North-East',
            'North-West',
            'South-East',
            'South-West',
        ],
    }),
    __metadata("design:type", String)
], Listing.prototype, "direction", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: ['New Booking', 'Resale'], default: 'New Booking' }),
    __metadata("design:type", String)
], Listing.prototype, "purchaseType", void 0);
__decorate([
    (0, typegoose_1.prop)({
        enum: ['Ready to Move', 'Under Construction'],
        default: 'Ready to Move',
    }),
    __metadata("design:type", String)
], Listing.prototype, "constructionStatus", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Listing.prototype, "images", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Listing.prototype, "videos", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Listing.prototype, "documents", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "location", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "locality", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "ownerContact", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Listing.prototype, "ownerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Listing.prototype, "commission", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Listing.prototype, "age", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        default: 'Immediate',
        enum: [
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
        ],
    }),
    __metadata("design:type", String)
], Listing.prototype, "possession", void 0);
__decorate([
    (0, typegoose_1.prop)({
        default: {
            ac: 0,
            stove: 0,
            modularKitchen: 0,
            fans: 0,
            fridge: 0,
            light: 0,
            beds: 0,
            microwave: 0,
            dinningTable: 0,
            tv: 0,
            dressingTable: 0,
            tvWallPanel: 0,
            wardrobe: 0,
            washingMachine: 0,
            geyser: 0,
            curtains: 0,
            sofa: 0,
            waterPurifier: 0,
            exhaust: 0,
        },
    }),
    __metadata("design:type", Object)
], Listing.prototype, "furnishingDetails", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Listing.prototype, "facilities", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Listing.prototype, "sold", void 0);
exports.Listing = Listing;
exports.ListingModel = (0, typegoose_1.getModelForClass)(Listing, {
    schemaOptions: {
        timestamps: true,
    },
});
