"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpOnlyCookie = void 0;
/**
 * Create an http only cookie
 * @param {string} title title of cookie
 * @param {string} body body of cookie
 * @param {string} res response object from controller
 */
const httpOnlyCookie = (title, body, res) => {
    return res.cookie(title, body, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
    });
};
exports.httpOnlyCookie = httpOnlyCookie;
