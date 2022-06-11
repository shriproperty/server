import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './input.scss';
import { FC } from 'react';

interface CheckBoxProps {
	label: string;
	className?: string;
	onChange(event: any): any;
	checked?: boolean;
}

/**
 * Check Box with label
 *
 *  `label`  The label of the input
 *
 *  `className`  The name of the input
 *
 *  `onChange` The function to be called when the check box is checked or unchecked
 *
 *  `checked`  If `true` the checkbox will be checked
 */
export const CheckBox: FC<CheckBoxProps> = props => {
	return (
		<FormControlLabel
			checked={props.checked}
			control={<Checkbox onChange={props.onChange} />}
			label={props.label}
			className={`${props.className} checkbox`}
		/>
	);
};
