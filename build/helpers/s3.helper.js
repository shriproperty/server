"use strict";
/* eslint-disable sonarjs/no-unused-collection */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleFilesFromS3 = exports.deleteSingleFileFromS3 = exports.uploadFileToS3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new aws_sdk_1.default.S3();
const BUCKET = process.env.AWS_BUCKET_NAME;
/**
 * @param {object} file file to be uploaded to s3
 * @return {Promise<object>} response from s3
 */
function uploadFileToS3(file) {
    const fileStream = (0, fs_1.createReadStream)(file.path);
    const uploadParams = {
        Bucket: BUCKET,
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
}
exports.uploadFileToS3 = uploadFileToS3;
/**
 * This function will take file `key` as param and delete that file form S3
 * @param {string}  key to be deleted from s3
 */
function deleteSingleFileFromS3(key) {
    const params = {
        Bucket: BUCKET,
        Key: key,
    };
    return s3.deleteObject(params).promise();
}
exports.deleteSingleFileFromS3 = deleteSingleFileFromS3;
/**
 * @param {object[]} files array of files to be deleted from s3
 * @example
 * ```js
 * deleteMultiple([...images, ...videos, ...documents]);
 * ```
 */
function deleteMultipleFilesFromS3(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let file of files) {
            yield deleteSingleFileFromS3(file.key);
        }
    });
}
exports.deleteMultipleFilesFromS3 = deleteMultipleFilesFromS3;
