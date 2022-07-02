import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import './alert.scss';
import { FC } from 'react';

interface ASuccessProps {
	title: string;
	open: boolean;
	setOpen(openState: boolean): any;
	className?: string;
}

/**
 * alert success
 * @param {{}} props Props
 * @param {string} props.title title to show on alert
 * @param {boolean} props.open if true alert will open else close
 * @param {string} props.className additional class names
 * @param {string} props.setOpen this will update state of open
 */
export const ASuccess: FC<ASuccessProps> = props => {
	return (
		<Collapse in={props.open}>
			<Alert
				severity="success"
				className={`alert ${props.className}`}
				action={
					<IconButton
						color="inherit"
						size="small"
						onClick={() => {
							props.setOpen(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				<p>{props.title}</p>
			</Alert>
		</Collapse>
	);
};

interface AErrorProps {
	title: string;
	open: boolean;
	setOpen(openState: boolean): any;
	className?: string;
}

/**
 * alert error
 * @param {{}} props Props
 * @param {string} props.title title to show on alert
 * @param {boolean} props.open if true alert will open else close
 * @param {string} props.className additional class names
 * @param {string} props.setOpen this will update state of open
 */
export const AError: FC<AErrorProps> = props => {
	return (
		<Collapse in={props.open}>
			<Alert
				severity="error"
				className={`alert ${props.className}`}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							props.setOpen(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				<p>{props.title}</p>
			</Alert>
		</Collapse>
	);
};

interface AWarningProps {
	title: string;
	open: boolean;
	setOpen(openState: boolean): any;
	className?: string;
}

/**
 * alert warning
 * @param {{}} props Props
 * @param {string} props.title title to show on alert
 * @param {boolean} props.open if true alert will open else close
 * @param {string} props.className additional class names
 * @param {string} props.setOpen this will update state of open
 */
export const AWarning: FC<AWarningProps> = props => {
	return (
		<Collapse in={props.open}>
			<Alert
				severity="warning"
				className={`alert ${props.className}`}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							props.setOpen(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				<p>{props.title}</p>
			</Alert>
		</Collapse>
	);
};
