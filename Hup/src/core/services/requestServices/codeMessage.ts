const codeMessage: Record<number, string> = {
	200: 'Your request was successful.',
	201: 'Resource created successfully.',
	202: 'Your request has been accepted and queued for processing.',
	204: 'The server successfully processed the request but there is no content to return.',
	400: 'Oops! Bad request. Please check your input and try again.',
	401: 'Unauthorized access. You need to authenticate first.',
	403: 'Access forbidden. You do not have permission to access this resource.',
	404: 'Sorry, the resource you requested could not be found.',
	406: 'The server cannot generate a response that is acceptable to the client.',
	410: 'The requested resource is no longer available.',
	422: 'Unprocessable entity. Your request could not be processed due to semantic errors.',
	500: 'Internal server error. Something went wrong on our end. Please try again later.',
	502: 'Bad gateway. The server received an invalid response from an upstream server.',
	503: 'Service unavailable. The server is temporarily unable to handle the request.',
	504: 'Gateway timeout. The server did not receive a timely response from the upstream server.',
};

export default codeMessage;
