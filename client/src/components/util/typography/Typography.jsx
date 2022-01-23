import React from 'react';
import propTypes from 'prop-types';
import { Typography } from '@mui/material';

import './typography.scss';

/**
 * Heading Primary
 * @param {string} title - The title of the Heading.
 * @param {string} className - Additional class names to add.
 */
export const HPrimary = ({ title, className }) => {
	return (
		<Typography variant="h1" className={`${className} heading-primary`}>
			{title}
		</Typography>
	);
};

HPrimary.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
};

/** Heading Secondary
 * @param {string} title - The title of the Heading.
 * @param {string} className - Additional class names to add.
 */
export const HSecondary = ({ title, className }) => {
	return (
		<Typography variant="h2" className={`${className} heading-secondary`}>
			{title}
		</Typography>
	);
};

HSecondary.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
};

/**
 * Para Primary
 * @param {string} title - The title of the para.
 * @param {string} className - Additional class names to add.
 */
export const SPrimary = ({ title, className }) => {
	return (
		<Typography
			variant="subtitle1"
			className={`${className} subtitle-primary`}
			component="p"
		>
			{title}
		</Typography>
	);
};

SPrimary.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
};

/**
 * Para Secondary
 * @param {string} title - The title of the para.
 * @param {string} className - Additional class names to add.
 */
export const SSecondary = ({ title, className }) => {
	return (
		<Typography
			variant="subtitle2"
			className={`${className} subtitle-secondary`}
			component="p"
		>
			{title}
		</Typography>
	);
};

SSecondary.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
};
