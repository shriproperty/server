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
exports.verifyTempUserHandler = exports.deleteTempUserHandler = exports.updateTempUserCallingStatusHandler = exports.getAllTempUsersHandler = exports.registerNewTempUserHandler = void 0;
const tempUser_model_1 = require("../models/tempUser.model");
const jwt_helper_1 = require("../helpers/jwt.helper");
const cookie_helper_1 = require("../helpers/cookie.helper");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const http_status_codes_1 = require("http-status-codes");
/* --------------------------------- ANCHOR create --------------------------------- */
const registerNewTempUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = req.body;
        const user = yield tempUser_model_1.TempUserModel.create({ name, email, phone });
        const token = (0, jwt_helper_1.generateJWT)({ id: user._id }, '24h');
        (0, cookie_helper_1.httpOnlyCookie)('tempUserToken', token, res);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: user,
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
exports.registerNewTempUserHandler = registerNewTempUserHandler;
/* ------------------------------ ANCHOR get all users ----------------------------- */
const getAllTempUsersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield tempUser_model_1.TempUserModel.find();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Users retrieved successfully',
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
exports.getAllTempUsersHandler = getAllTempUsersHandler;
/* ------------------------------- ANCHOR update user calling status for admin ------------------------------ */
const updateTempUserCallingStatusHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { callingStatus, callAgainDate, talkProgress } = req.body;
        // check if 'callingStatus' is 'Call Again' but 'callAgainDate' is null or `talkProgress` is null
        if (callingStatus === 'Call Again' &&
            (!callAgainDate || !talkProgress)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: '`callAgainDate`, `talkProgress` are required for `Call Again`',
                data: {},
            });
        }
        // check if 'callingStatus' is not 'Call Again' but 'callAgainDate' is not null or 'talkProgress' is not null
        if (callingStatus !== 'Call Again' && (callAgainDate || talkProgress)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'You can only assign `callAgainDate`, `talkProgress` when calling status is `Call Again`',
                data: {},
            });
        }
        // update user calling status and date
        const updatedUser = yield tempUser_model_1.TempUserModel.findByIdAndUpdate(id, {
            callingStatus,
            callAgainDate,
            talkProgress,
        }, { new: true });
        if (!updatedUser) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'No User Found',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'User not found invalid id',
            data: {},
        });
    }
});
exports.updateTempUserCallingStatusHandler = updateTempUserCallingStatusHandler;
/* --------------------------- ANCHOR delete user --------------------------- */
const deleteTempUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield tempUser_model_1.TempUserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User Not Found',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
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
exports.deleteTempUserHandler = deleteTempUserHandler;
/* ------------------------------- ANCHOR verify user ------------------------------ */
const verifyTempUserHandler = (req, res) => {
    try {
        const { tempUserToken, token } = req.cookies;
        // use this to verify if user is logged in
        if (token) {
            const verifiedToken = (0, jwt_helper_1.verifyJWT)(token);
            if (!verifiedToken) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid token',
                    data: {},
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'User verified successfully',
                data: {},
            });
        }
        // use this to verify if user is temp user
        const verifiedUser = (0, jwt_helper_1.verifyJWT)(tempUserToken);
        if (!verifiedUser) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid token',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'User verified successfully',
            data: {},
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid token',
            data: {},
        });
    }
};
exports.verifyTempUserHandler = verifyTempUserHandler;
