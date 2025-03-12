import { getConnectedUser } from '@/core/services/modulesServices/user.service';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { Dispatch } from 'redux';

export const fetchAndSetConnectedUser = async (dispatch: Dispatch) => {
	return getConnectedUser().then((res) => {
		const connectedUser = {
			id: res.data.data.id,
			fullName: res.data.user.fullName,
			email: res.data.user.email,
			avatar: res.data.user.avatar,
			role: res.data.user.role,
			apps: res.data.user.apps,
		
		};

		dispatch(setConnectedUser(connectedUser));
	});
};
