"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.getSingleUserSchema = void 0;
const zod_1 = require("zod");
exports.getSingleUserSchema = {
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    query: zod_1.z.object({
        listings: zod_1.z.string().optional(),
        properties: zod_1.z.string().optional(),
    }),
};
exports.resetPasswordSchema = {
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        newPassword: zod_1.z.string({
            required_error: 'new password field is required',
        }),
    }),
};
