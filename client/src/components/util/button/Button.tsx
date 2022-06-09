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
 * `title` text to show on button
 *
 * `className` additional classNames to add to button
 *
 * `type` type of button eg-submit
 *
 * `loading` if true button will show loading indicator
 *
 * `style` type of style eg-padding: '0'
 *
 * `onClick` function to call on click
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
 * `title` text to show on button
 *
 * `className` additional classNames to add to button
 *
 * `onChange` onChange event handler
 *
 * `accept`
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
