import React from 'react';
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
