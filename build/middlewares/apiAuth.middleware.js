"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const apiAuth = (req, res, next) => {
    const apiKeyFromHeaders = req.headers['x-api-key'];
    if (apiKeyFromHeaders !== process.env.API_KEY) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized',
            data: {},
        });
    }
    next();
};
exports.default = apiAuth;
