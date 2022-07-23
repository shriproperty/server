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
exports.resetPasswordHandler = exports.getSingleUserHandler = exports.getAllHandler = void 0;
const user_model_1 = require("../models/user.model");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const http_status_codes_1 = require("http-status-codes");
/* ---------------------------- SECTION get all users ---------------------------- */
const getAllHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find({});
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'All contacts fetched successfully',
            data: users,
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
exports.getAllHandler = getAllHandler;
/* -------------------------------- !SECTION Get all users end -------------------------------- */
/* ------------------------- SECTION get single user ------------------------ */
const getSingleUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { listings, properties } = req.query;
        let user;
        // ANCHOR populate both listings and properties
        if (listings && properties) {
            user = yield user_model_1.UserModel.findById(id)
                .populate('listings')
                .populate('properties');
        }
        else if (listings) {
            user = yield user_model_1.UserModel.findById(id).populate('listings');
        }
        else if (properties) {
            user = yield user_model_1.UserModel.findById(id).populate('properties');
        }
        else {
            user = yield user_model_1.UserModel.findById(id);
        }
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        if (err.path === '_id') {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error',
            data: {},
        });
    }
});
exports.getSingleUserHandler = getSingleUserHandler;
/* -------------------------- !SECTION get single user end -------------------------- */
/* -------------------------- SECTION - reset password ------------------------- */
const resetPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        // check if user exists
        const user = yield user_model_1.UserModel.findOne({ email });
        // NOTE: Password will be hashed in user.model.ts pre() decorator
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found please check if your email is correct',
                data: {},
            });
        }
        user.password = newPassword;
        yield user.save();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Password updated successfully',
            data: {},
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
exports.resetPasswordHandler = resetPasswordHandler;
/* -------------------------------- !SECTION -------------------------------- */
