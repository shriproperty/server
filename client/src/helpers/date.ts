export const dateToIntlDateFormatter = (date: Date | string) => {
	const dateFromString = new Date(date);

	const formattedDate = new Intl.DateTimeFormat(navigator.language).format(
		dateFromString
	);

	return formattedDate;
};
