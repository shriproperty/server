import propTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './input.scss';

/**
 * Check Box with label
 * @param {string} label  The label of the input
 * @param {string} className  The name of the input
 * @param {string} onChange The function to be called when the check box is checked or unchecked
 */
export const CheckBox = ({ label, className, onChange }) => {
	return (
		<FormControlLabel
			control={<Checkbox onChange={onChange} />}
			label={label}
			className={`${className} checkbox`}
		/>
	);
};

CheckBox.propTypes = {
	label: propTypes.string.isRequired,
	className: propTypes.string,
	onChange: propTypes.func,
};
