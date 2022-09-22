
export const dateUTCToLocalString = (date: string): string => {
	const dateUTC = new Date(date);
	return new Intl.DateTimeFormat('pt-BR', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	}).format(dateUTC);
}