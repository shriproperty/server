"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleFilesFromDisk = exports.deleteSingleFileFromDisk = void 0;
const fs_1 = require("fs");
/**
 * delete file from folder
 * @param {string} path path of file to be deleted
 */
function deleteSingleFileFromDisk(path) {
    (0, fs_1.unlink)(path, err => {
        if (err) {
            throw err;
        }
    });
    return 'File deleted successfully';
}
exports.deleteSingleFileFromDisk = deleteSingleFileFromDisk;
/**
 * delete multiple files from folder
 * @param {Array} files array of files to be deleted
 * ```js
 * // this will put multiple arrays in one array and than delete all files from that
 * deleteMultipleFiles([...images, ...videos, ...documents]);
 * ```
 */
function deleteMultipleFilesFromDisk(files) {
    files.forEach(file => {
        if (file)
            deleteSingleFileFromDisk(file.path);
    });
}
exports.deleteMultipleFilesFromDisk = deleteMultipleFilesFromDisk;
