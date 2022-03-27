import propTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import './alert.scss';

/**
 * alert success
 * @param {string} title title to show on alert
 * @param {boolean} open if true alert will open else close
 * @param {string} className additional class names
 * @param {function} setOpen this will update state of open
 * @returns {JSX.Element} alert success
 */
export const ASuccess = ({ title, open, setOpen, className }) => {
	return (
		<Collapse in={open}>
			<Alert
				severity="success"
				className={`alert ${className}`}
				action={
					<IconButton
						color="inherit"
						size="small"
						onClick={() => {
							setOpen(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				<p>{title}</p>
			</Alert>
		</Collapse>
	);
};

ASuccess.propTypes = {
	title: propTypes.string.isRequired,
	open: propTypes.bool.isRequired,
	setOpen: propTypes.func.isRequired,
	className: propTypes.string,
};

/**
 * alert error
 * @param {string} title title to show on alert
 * @param {boolean} open if true alert will open else close
 * @param {string} className additional class names
 * @param {function} setOpen this will update state of open
 * @returns {JSX.Element} alert error
 */
export const AError = ({ title, open, setOpen, className }) => {
	return (
		<Collapse in={open}>
			<Alert
				severity="error"
				className={`alert ${className}`}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setOpen(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				<p>{title}</p>
			</Alert>
		</Collapse>
	);
};

AError.propTypes = {
	title: propTypes.string.isRequired,
	open: propTypes.bool.isRequired,
	setOpen: propTypes.func.isRequired,
	className: propTypes.string,
};

/**
 * alert warning
 * @param {string} title title to show on alert
 * @param {boolean} open if true alert will open else close
 * @param {string} className additional class names
 * @param {function} setOpen this will update state of open
 * @returns {JSX.Element} alert error
 */
export const AWarning = ({ title, open, setOpen, className }) => {
	return (
		<Collapse in={open}>
			<Alert
				severity="warning"
				className={`alert ${className}`}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setOpen(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				<p>{title}</p>
			</Alert>
		</Collapse>
	);
};

AWarning.propTypes = {
	title: propTypes.string.isRequired,
	open: propTypes.bool.isRequired,
	setOpen: propTypes.func.isRequired,
	className: propTypes.string,
};
