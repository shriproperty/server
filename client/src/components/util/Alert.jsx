import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

/**
 * alert success
 * @param {string} title title to show on alert
 * @returns {JSX.Element} alert success
 */
export const ASuccess = ({ title }) => {
	const [open, setOpen] = useState(true);

	return (
		<Collapse in={open}>
			<Alert
				severity="success"
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
				{title}
			</Alert>
		</Collapse>
	);
};

/**
 * alert error
 * @param {string} title title to show on alert
 * @returns {JSX.Element} alert error
 */
export const AError = ({ title, open, setOpen }) => {
	return (
		<Collapse in={open}>
			<Alert
				severity="error"
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
				{title}
			</Alert>
		</Collapse>
	);
};
