import dayjs from 'dayjs';

export const findInputError = (errors: any, name: string): any => {
	const filtered = Object.keys(errors)
		.filter((key) => key.includes(name))
		.reduce((cur, key) => {
			return Object.assign(cur, { error: errors[key] });
		}, {});
	return filtered;
};

export const isFormInvalid = (err: any) => {
	if (Object.keys(err).length > 0) return true;
	return false;
};

export const formatFloat = (num: number): string => {
	const formattedNum = num.toFixed(1);
	return formattedNum.replace(/\.0$/, '');
};

export const convertToBase64 = (file: File) => {
	if (!(file instanceof File)) return file;
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64String = reader.result?.toString().split(',')[1];
			if (base64String) {
				resolve(base64String);
			} else {
				reject(new Error('Failed to convert file to Base64'));
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

export const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const checkValidImg = (file: File | null): boolean => {
	if (!file) return true;
	const fileLimit = 5000;
	const fileSize = file.size / 1024;

	const allowedExtensions = ['jpg', 'png', 'jpeg'];
	const fileExtension = file.name.split('.').pop()?.toLowerCase();

	if (fileExtension && !allowedExtensions?.includes(fileExtension)) return false;

	if (!(fileSize <= fileLimit)) return false;

	return true;
};

export const formatDateRange = (
	currentlyWorkingAtThisRole: boolean,
	startDate: string,
	endDate: string,
): string => {
	const start = new Date(startDate);
	const end = currentlyWorkingAtThisRole ? new Date() : new Date(endDate);

	const startMonthYear = start.toLocaleString('en-US', { month: 'long', year: 'numeric' });
	const endMonthYear = end.toLocaleString('en-US', { month: 'long', year: 'numeric' });

	return `${startMonthYear} - ${currentlyWorkingAtThisRole ? 'Present' : endMonthYear}`;
};

export const formatDateRangeObject = (
	currentlyWorkingAtThisRole: boolean,
	startDate: { month: string; year: string },
	endDate: { month: string; year: string },
): string => {
	const startMonthIndex = months.indexOf(startDate.month);
	const endMonthIndex = months.indexOf(endDate.month);
	const startMonth = String(startMonthIndex + 1).padStart(2, '0');
	const endMonth = String(endMonthIndex + 1).padStart(2, '0');

	const start = new Date(`${startDate.year}-${startMonth}`);
	const end = currentlyWorkingAtThisRole ? new Date() : new Date(`${endDate.year}-${endMonth}`);

	const startMonthYear = start.toLocaleString('en-US', { month: 'long', year: 'numeric' });
	const endMonthYear = end.toLocaleString('en-US', { month: 'long', year: 'numeric' });

	return `${startMonthYear} - ${currentlyWorkingAtThisRole ? 'Present' : endMonthYear}`;
};

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) =>
	(currentYear - index).toString(),
);

export const validateDateRange = (
	startDate: { year: string | null; month: string | null },
	endDate: { year: string | null; month: string | null },
): boolean => {
	if (
		startDate.year &&
		endDate?.year &&
		startDate.month &&
		endDate.month &&
		(parseInt(startDate.year) > parseInt(endDate.year) ||
			(parseInt(startDate.year) === parseInt(endDate.year) &&
				months.indexOf(startDate.month) > months.indexOf(endDate.month)))
	) {
		return false;
	}
	return true;
};

export const isValidURL = (link: string) => {
	const res = link.match(
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%. +~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
	);
	return res !== null;
};

export const parseTime = (timeStr: string, date: Date) => {
	return dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${timeStr}`, 'YYYY-MM-DD h:mm A');
};

export const capitalizePageName = (page: string) => {
	return page
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const filterOptions = [
	{ value: 'desc', label: 'Newest to Oldest', key: 'createdAt' },
	{ value: 'asc', label: 'Oldest to Newest', key: 'createdAt' },
	{ value: 'asc', label: 'Name A-Z', key: 'title' },
	{ value: 'desc', label: 'Name Z-A', key: 'title' },
];
