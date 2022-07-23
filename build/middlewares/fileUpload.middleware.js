"use strict";
/* eslint-disable valid-jsdoc */
/* eslint-disable pii/no-phone-number */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const http_status_codes_1 = require("http-status-codes");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
/**
 * this function filter images and videos based on the file type
 */
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'video/mp4') {
        // to accept files pass true
        cb(null, true);
    }
    else {
        // to reject files pass false
        cb(null, false);
        throw new Error('Invalid file type');
    }
};
const upload = (0, multer_1.default)({ fileFilter: fileFilter, storage: storage });
// upload file middleware
const fileUpload = (req, res, next) => {
    upload.any()(req, res, err => {
        // send error if file type is incorrect
        if (err) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'You can only upload .png, .jpg, .jpeg, .pdf and .mp4 files',
                data: {},
            });
        }
        next();
    });
};
exports.default = fileUpload;
