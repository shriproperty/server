"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactStatusSchema = exports.createContactSchema = void 0;
const zod_1 = require("zod");
const STATUS = ['Pending', 'In Progress', 'Completed'];
exports.createContactSchema = {
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'name is required' })
            .min(3, 'name is cannot be small than 3 characters')
            .max(30, 'name is longer than 30 characters'),
        email: zod_1.z
            .string({ required_error: 'email is required' })
            .email('please enter a valid email'),
        phone: zod_1.z
            .string({ required_error: 'phone is required' })
            .min(10, 'phone must be 10 digits long')
            .max(10, 'phone must be 10 digits long'),
        subject: zod_1.z
            .string({ required_error: 'subject is required' })
            .max(300, 'Subject should not be more than 300 characters'),
        message: zod_1.z
            .string({ required_error: 'message is required' })
            .max(1000, 'Message can not be longer than 1000 characters'),
    }),
};
exports.updateContactStatusSchema = {
    body: zod_1.z.object({
        status: zod_1.z.enum(STATUS),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required' }),
    }),
};
