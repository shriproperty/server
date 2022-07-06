import { FC } from 'react';
import { dateToIntlDateFormatter } from '../../../helpers/date';

interface DateProps {
	date: Date | string;
}

/**
 * @param {Object} props props
 * @param {Date | string} props.date date to format
 */
const Date: FC<DateProps> = props => {
	return <span>{dateToIntlDateFormatter(props.date)}</span>;
};

export default Date;
