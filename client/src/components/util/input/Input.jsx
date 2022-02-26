import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './input.scss';

export const CheckBox = ({ label, className, onChange }) => {
	return (
		<FormControlLabel
			control={<Checkbox onChange={onChange} />}
			label={label}
			className={`${className} checkbox`}
		/>
	);
};
