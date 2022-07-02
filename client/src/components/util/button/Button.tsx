import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

import './button.scss';
import { FC } from 'react';

interface BPrimaryProps {
	title: string | JSX.Element;
	className?: string;
	type?: ButtonTypes;
	loading?: boolean;
	style?: ObjectWithAnyKeys;
	onClick?: any;
}

/**
 * Button primary component
 * @param {{}} props props
 * @param {string} props.title text to show on button
 * @param {string} props.className additional classNames to add to button
 * @param {string} props.type type of button eg-submit
 * @param {boolean} props.loading if true button will show loading indicator
 * @param {string} props.style type of style eg-padding: '0'
 * @param {Function} props.onClick function to call on click
 */
export const BPrimary: FC<BPrimaryProps> = props => {
	return (
		<Button
			style={props.style}
			className={`${props.className} btn-primary`}
			type={props.type ? props.type : 'submit'}
			variant="contained"
			onClick={props.onClick}
		>
			{props.loading ? <CircularProgress /> : props.title}
		</Button>
	);
};

interface BUploadProps {
	title: string;
	className?: string;
	accept: string;
	onChange?: any;
}

/**
 * Button to upload files
 * @param {{}} props Props
 * @param {string} props.title text to show on button
 * @param {string} props.className additional classNames to add to button
 * @param {string} props.onChange` onChange event handler
 * @param {string} props.accept specify which type of files to accept eg:- `png` `jpg`
 */
export const BUpload: FC<BUploadProps> = props => {
	return (
		<Button
			variant="contained"
			component="label"
			className={`${props.className} btn-primary`}
			onChange={props.onChange}
		>
			{props.title}
			<input type="file" multiple hidden accept={props.accept} />
		</Button>
	);
};
