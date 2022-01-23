import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@mui/material';

import './button.scss';

/**
 * button primary component
 * @param {string} title text to show on button
 * @param {string} className additional classNames to add to button
 * @param {string} type type of button eg-submit
 * @returns {JSX.Element} button primary component
 */
export const BPrimary = ({ title, className, type }) => {
	return (
		<Button
			className={`${className} btn-primary`}
			type={type}
			variant="contained"
		>
			{title}
		</Button>
	);
};

BPrimary.prototype = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
	type: propTypes.string,
};

/**
 * Button to upload files
 * @param {string} title text to show on button
 * @param {string} className additional classNames to add to button
 * @param {function} onChange onChange envent handler
 * @returns {JSX.Element} file upload button
 */
export const BUpload = ({ title, className, onChange, accept }) => {
	return (
		<Button
			variant="contained"
			component="label"
			className={`${className} btn-primary`}
			onChange={onChange}
		>
			{title}
			<input type="file" multiple hidden accept={accept} />
		</Button>
	);
};

BUpload.prototype = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
	onChange: propTypes.func,
	accept: propTypes.string,
};
