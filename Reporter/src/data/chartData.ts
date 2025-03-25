function generateDates(days: number): { date: string; views: number }[] {
	const dates = [];
	const currentDate = new Date();

	for (let i = 0; i < days; i++) {
		const date = new Date();
		date.setDate(currentDate.getDate() - i);
		const formattedDate = date.toISOString().split('T')[0];
		dates.push({ date: formattedDate, views: 0 });
	}

	return dates.reverse();
}

export const chartData: {
	[key: string]: { date: string; views: number }[];
} = {
	'7D': generateDates(7),
	'30D': generateDates(30),
	'90D': generateDates(90),
};
