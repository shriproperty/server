import { unlink } from 'fs';

/**
 * delete file from folder
 * @param {string} path path of file to be deleted
 */
export function deleteSingleFileFromDisk(path: string): string {
	unlink(path, err => {
		if (err) {
			throw err;
		}
	});

	return 'File deleted successfully';
}

/**
 * delete multiple files from folder
 * @param {Array} files array of files to be deleted
 * ```js
 * // this will put multiple arrays in one array and than delete all files from that
 * deleteMultipleFiles([...images, ...videos, ...documents]);
 * ```
 */
export function deleteMultipleFilesFromDisk(files: MulterFile[]) {
	files &&
		files.forEach(file => {
			if (file) deleteSingleFileFromDisk(file.path);
		});
}
