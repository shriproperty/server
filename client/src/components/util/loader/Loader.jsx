import React from 'react';
import propTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

import './loader.scss';

/**
 * Loading indicator
 * @param {boolean} fullScreen If true, the loader will be displayed in full screen
 * @param {boolean} fullWidth If true, the loader will take full width
 * @return {JSX.Element}
 */
const Loader = ({ fullScreen, fullWidth }) => {
	return (
		<div
			className={`loader ${fullScreen && 'loader--full'} ${
				fullWidth && 'loader--width'
			}`}
		>
			<CircularProgress />
		</div>
	);
};

Loader.propTypes = {
	fullScreen: propTypes.bool,
	fullWidth: propTypes.bool,
};

export default Loader;
