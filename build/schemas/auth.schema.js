"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = {
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({ required_error: 'name is required' })
            .min(3, 'name must be at least 3 characters long')
            .max(20, 'name can not be longer than 20 characters'),
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        phone: zod_1.z.string({ required_error: 'phone is required' }),
        password: zod_1.z
            .string({ required_error: 'password is required' })
            .min(4, 'password should be longer than 4 characters')
            .max(30, 'password can not be longer than 30 characters'),
        cpassword: zod_1.z
            .string({ required_error: 'cpassword is required' })
            .min(4, 'password should be longer than 4 characters')
            .max(30, 'password can not be longer than 30 characters'),
    })
        .refine(data => data.password === data.cpassword, {
        message: 'Password and confirm password do not match',
        path: ['cpassword'],
    }),
};
exports.loginSchema = {
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
};
