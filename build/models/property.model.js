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
exports.PropertyModel = exports.Property = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
class Property {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "specialPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: ['Rental', 'Sale', 'PG'], default: 'Sale' }),
    __metadata("design:type", String)
], Property.prototype, "type", void 0);
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
], Property.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "security", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "maintenance", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: ['Unfurnished', 'Semifurnished', 'Furnished'],
        default: 'Unfurnished',
    }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "featured", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "size", void 0);
__decorate([
    (0, typegoose_1.prop)({
        enum: [
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
        ],
    }),
    __metadata("design:type", String)
], Property.prototype, "unit", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "bedroom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "bathroom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "kitchen", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "openParking", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "closeParking", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "livingRoom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "store", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "balcony", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "dinningRoom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "floor", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "poojaRoom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Property.prototype, "otherFeatures", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "lobby", void 0);
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
], Property.prototype, "direction", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: ['New Booking', 'Resale'], default: 'New Booking' }),
    __metadata("design:type", String)
], Property.prototype, "purchaseType", void 0);
__decorate([
    (0, typegoose_1.prop)({
        enum: ['Ready to Move', 'Under Construction'],
        default: 'Ready to Move',
    }),
    __metadata("design:type", String)
], Property.prototype, "constructionStatus", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Property.prototype, "videos", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Property.prototype, "documents", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "location", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "locality", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "ownerContact", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Property.prototype, "ownerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "commission", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Property.prototype, "age", void 0);
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
], Property.prototype, "possession", void 0);
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
], Property.prototype, "furnishingDetails", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Property.prototype, "facilities", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "sold", void 0);
exports.Property = Property;
exports.PropertyModel = (0, typegoose_1.getModelForClass)(Property, {
    schemaOptions: {
        timestamps: true,
    },
});
