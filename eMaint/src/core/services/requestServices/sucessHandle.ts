import { toast } from 'react-hot-toast';
import codeMessage from './codeMessage';

interface ResponseData {
	success: boolean;
	message?: string;
}

interface ResponseOptions {
	notifyOnSuccess?: boolean;
	notifyOnFailed?: boolean;
}

const successHandler = (
	response: { data: ResponseData; status: number },
	options: ResponseOptions = { notifyOnSuccess: false, notifyOnFailed: true },
	props: any = {},
) => {
	const { data } = response;
	const message = response.data && data.message;

	if (data) {
		const successText = message || codeMessage[response.status];

		if (options.notifyOnSuccess) {
			toast.success(successText, { ...props, duration: 3000 });
		}
	} else {
		const errorText = message || codeMessage[response.status];
		if (options.notifyOnFailed) {
			toast.error(errorText, { duration: 3000 });
		}
	}
};

export default successHandler;
