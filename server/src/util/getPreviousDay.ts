export const getPreviousDay = (dateReference: Date): Date => {
	const date: Date = new Date(dateReference);

	date.setDate(date.getDate() - 1);

	return date;
};
