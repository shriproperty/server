"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const otp_controller_1 = require("../controllers/otp.controller");
const otp_schema_1 = require("../schemas/otp.schema");
const otpRouter = (0, express_1.Router)();
otpRouter.post('/otp/send', (0, zod_express_middleware_1.processRequestBody)(otp_schema_1.sendOtpSchema.body), otp_controller_1.sendOtpHandler);
otpRouter.post('/otp/verify', (0, zod_express_middleware_1.processRequestBody)(otp_schema_1.verifyOtpSchema.body), otp_controller_1.verifyOtpHandler);
exports.default = otpRouter;
