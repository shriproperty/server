"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTempUserSchema = exports.updateTempUserCallingStatusSchema = exports.registerNewSchema = void 0;
const zod_1 = require("zod");
/* --------------------------- ANCHOR register new -------------------------- */
exports.registerNewSchema = {
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .min(3, 'name must be at least 3 character long')
            .max(20, 'name can not be long than 30 characters'),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email('please enter a valid email'),
        phone: zod_1.z
            .string({
            required_error: 'phone is required',
        })
            .min(10, 'phone should be 10 digits long remove +91 if added')
            .max(10, 'phone must be 10 digits long remove +91 if added'),
    }),
};
/* ------------------------------ ANCHOR update ----------------------------- */
exports.updateTempUserCallingStatusSchema = {
    body: zod_1.z.object({
        callingStatus: zod_1.z.string(),
        callAgainDate: zod_1.z.string().optional(),
        talkProgress: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
};
/* ------------------------------ ANCHOR delete ----------------------------- */
exports.deleteTempUserSchema = {
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
};
