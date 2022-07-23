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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcrypt_1 = require("bcrypt");
const listing_model_1 = require("./listing.model");
const property_model_1 = require("./property.model");
let User = class User {
    comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, bcrypt_1.compare)(password, this.password);
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => property_model_1.Property, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "properties", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => listing_model_1.Listing, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "listings", void 0);
User = __decorate([
    (0, typegoose_1.pre)('save', function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isModified('password') || this.isNew) {
                const salt = yield (0, bcrypt_1.genSalt)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(this.password, salt);
                this.password = hashedPassword;
                return next();
            }
        });
    })
], User);
exports.User = User;
exports.UserModel = (0, typegoose_1.getModelForClass)(User, {
    schemaOptions: {
        timestamps: true,
    },
});
