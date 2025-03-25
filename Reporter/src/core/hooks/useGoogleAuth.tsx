import { AxiosResponse } from 'axios';
import { useEffect, useRef } from 'react';

const useGoogleAuth = (handleGoogle: (response: AxiosResponse) => void) => {
	const authDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initializeGoogleAuth = async () => {
			if (window.google) {
				window.google.accounts.id.initialize({
					client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
					callback: handleGoogle,
				});

				if (authDivRef.current) {
					window.google.accounts.id.renderButton(authDivRef.current, {
						text: 'continue_with',
					});
				}

				// window.google.accounts.id.prompt();
			}
		};

		initializeGoogleAuth();

		return () => {
			// Cleanup if necessary
		};
	}, [handleGoogle]);

	return authDivRef;
};

export default useGoogleAuth;
