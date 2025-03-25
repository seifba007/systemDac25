import { getConnectedUser } from '@/core/services/modulesServices/user.service';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { Dispatch } from 'redux';

export const fetchAndSetConnectedUser = async (dispatch: Dispatch) => {
	return getConnectedUser().then((res) => {
		const emailPreference = res.data.data.emailPreference;
		const connectedUser = {
			id: res.data.data.id,
			fullName: res.data.data.fullName,
			email: res.data.data.email,
			avatar: res.data.data.avatar,
			role: res.data.data.role.name,
			emailPreference: {
				marketing: emailPreference?.marketing,
				confirmation_updates: emailPreference?.confirmation_updates,
				payments: emailPreference?.payments,
				projects_updates: emailPreference?.projects_updates,
				job_application: emailPreference?.job_application,
			},
			oneSignalUserId: res.data.data.oneSignalUserId,
		};

		dispatch(setConnectedUser(connectedUser));
	});
};
