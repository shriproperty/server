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
exports.verifyOtpHandler = exports.sendOtpHandler = void 0;
const otp_model_1 = require("../models/otp.model");
const email_helper_1 = require("../helpers/email.helper");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const http_status_codes_1 = require("http-status-codes");
/* ------------------------------- ANCHOR send otp ------------------------------- */
const sendOtpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // get all otps which match same email and than delete them
        const existingOtps = yield otp_model_1.OtpModel.find({ email });
        if (existingOtps.length > 0) {
            yield otp_model_1.OtpModel.deleteMany({ email });
        }
        // generate otp
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        // send to email
        yield (0, email_helper_1.sendEmail)(email, 'OTP for Shri Property', `Your OTP is: ${otp}`);
        // save to db
        const saveOtpToDB = yield otp_model_1.OtpModel.create({
            email,
            otp,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: 'Otp sent successfully',
            data: saveOtpToDB,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            message: 'Please enter valid Email',
            data: {},
        });
    }
});
exports.sendOtpHandler = sendOtpHandler;
/* ------------------------------- ANCHOR verify otp ------------------------------- */
const verifyOtpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const otpFromDB = yield otp_model_1.OtpModel.findOne({ email });
        if ((otpFromDB === null || otpFromDB === void 0 ? void 0 : otpFromDB.otp) !== otp) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Please enter valid otp',
                data: {},
            });
        }
        // delete otp from db
        yield otp_model_1.OtpModel.deleteOne({ email });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Otp verified successfully',
            data: {},
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Your OTP is expired',
            data: {},
        });
    }
});
exports.verifyOtpHandler = verifyOtpHandler;
