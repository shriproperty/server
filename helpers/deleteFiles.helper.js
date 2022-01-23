import { unlink } from 'fs';

/**
 * delete file from folder
 * @param {string} path path of file to be deleted
 */
export const deleteSingleFileFromDisk = path => {
	unlink(path, err => {
		if (err) throw new Error('Error deleting file');
	});
};

/**
 * delete multiple files from folder
 * @param {Array} files array of files to be deleted
 * @example
 * ```js
 * // this will put multiple arrays in one array and than delete all files from that
 * deleteMultipleFiles([...images, ...videos, ...documents]);
 * ```
 */
export const deleteMultipleFilesFromDisk = files => {
	files.forEach(file => {
		if (file) deleteSingleFileFromDisk(file.path);
	});
};
