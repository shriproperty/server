"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.sendOtpSchema = void 0;
const zod_1 = require("zod");
exports.sendOtpSchema = {
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'You need to enter valid email' })
            .email('You need to enter valid email'),
    }),
};
exports.verifyOtpSchema = {
    body: zod_1.z.object({
        otp: zod_1.z.string({ required_error: 'You must enter otp' }),
        email: zod_1.z
            .string({ required_error: 'email is required' })
            .email('You must enter a valid email'),
    }),
};
