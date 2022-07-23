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
exports.isLoggedInHandler = exports.logoutHandler = exports.loginHandler = exports.signupHandler = void 0;
const user_model_1 = require("../models/user.model");
const jwt_helper_1 = require("../helpers/jwt.helper");
const cookie_helper_1 = require("../helpers/cookie.helper");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const http_status_codes_1 = require("http-status-codes");
/* --------------------------------- ANCHOR Signup --------------------------------- */
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        // NOTE: Password will be hashed in user.model.ts pre() decorator
        // create user
        const newUser = yield user_model_1.UserModel.create({
            name,
            email,
            phone,
            password,
        });
        // generate jwt token
        const token = (0, jwt_helper_1.generateJWT)({
            id: newUser._id,
        });
        (0, cookie_helper_1.httpOnlyCookie)('token', token, res);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: newUser,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        if (err.code === 11000) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                success: false,
                message: 'user already exists',
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
exports.signupHandler = signupHandler;
/* ---------------------------------- ANCHOR login --------------------------------- */
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user || !(yield user.comparePassword(password))) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Please check email or password',
                data: {},
            });
        }
        // generate jwt token
        const token = (0, jwt_helper_1.generateJWT)({ id: user._id });
        (0, cookie_helper_1.httpOnlyCookie)('token', token, res);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'User logged in successfully',
            data: user,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Please check your email or password',
            data: {},
        });
    }
});
exports.loginHandler = loginHandler;
/* ---------------------------------- ANCHOR logout --------------------------------- */
const logoutHandler = (req, res) => res.clearCookie('token').status(http_status_codes_1.StatusCodes.OK).json({
    success: true,
    message: 'User logged out successfully',
    data: {},
});
exports.logoutHandler = logoutHandler;
// /* ------------------------------ ANCHOR is logged in ------------------------------ */
const isLoggedInHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        const isLoggedIn = (0, jwt_helper_1.verifyJWT)(token);
        if (!isLoggedIn) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'User is not logged in',
                data: {},
            });
        }
        const user = yield user_model_1.UserModel.findById(isLoggedIn.id)
            .populate('properties')
            .populate('listings');
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'User is logged in',
            data: user,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'User is not logged in',
            data: {},
        });
    }
});
exports.isLoggedInHandler = isLoggedInHandler;
