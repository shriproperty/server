import { FC } from 'react';
import { dateToIntlDateFormatter } from '../../../helpers/date';

interface FormattedDateProps {
	date: Date | string;
}

/**
 * @param {Object} props props
 * @param {Date | string} props.date date to format
 */
const FormattedDate: FC<FormattedDateProps> = props => {
	return <span>{dateToIntlDateFormatter(props.date)}</span>;
};

export default FormattedDate;
