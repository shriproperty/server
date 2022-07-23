"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Generate JWT token
 * @param {string | Buffer | object} body body of token
 * @param {expire | undefined} expire after what time token should expire automatically
 */
const generateJWT = (body, expire) => {
    if (expire) {
        return jsonwebtoken_1.default.sign(body, JWT_SECRET, {
            expiresIn: expire,
        });
    }
    else {
        return jsonwebtoken_1.default.sign(body, JWT_SECRET);
    }
};
exports.generateJWT = generateJWT;
/**
 * Verify JWT token
 * @param {string} token token to verify
 */
const verifyJWT = (token) => {
    try {
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return verified;
    }
    catch (e) {
        logger_helper_1.default.error(e);
        return null;
    }
};
exports.verifyJWT = verifyJWT;
