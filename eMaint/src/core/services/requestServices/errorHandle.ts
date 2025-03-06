import { toast, ToastOptions } from 'react-hot-toast';
import codeMessage from './codeMessage';

export interface ErrorResponse {
	status: number;
	data?: {
		message: string;
	};
	message?: string;
}

const errorHandler = (error: ErrorResponse, props: ToastOptions = {}) => {
	const { status, data, message: directMessage } = error;
	const message = data?.message || directMessage;

	if (status) {
		const errorText = message || codeMessage[status] || 'An unknown error occurred';

		toast.error(errorText, { ...props, duration: 3000 });
		return { status, message: errorText };
	} else {
		if (!navigator.onLine) {
			toast.error('No internet connection: Please check your internet connection.', {
				...props,
				duration: 5000,
			});
		} else {
			toast.error('Oops! Something went wrong. Please try again later.', {
				...props,
				duration: 5000,
			});
		}

		return {
			success: false,
			result: null,
			message: 'Cannot connect to the server. Check your internet connection.',
		};
	}
};

export default errorHandler;
