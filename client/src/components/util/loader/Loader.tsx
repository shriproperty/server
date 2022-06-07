import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import './loader.scss';

interface LoaderProps {
	fullScreen?: boolean;
	fullWidth?: boolean;
}

/**
 * Loading indicator
 */
const Loader: FC<LoaderProps> = props => {
	return (
		<div
			className={`loader ${props.fullScreen && 'loader--full'} ${
				props.fullWidth && 'loader--width'
			}`}
		>
			<CircularProgress />
		</div>
	);
};

export default Loader;
