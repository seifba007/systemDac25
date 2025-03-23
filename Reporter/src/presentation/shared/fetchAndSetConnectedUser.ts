import { getConnectedUser } from '@/core/services/modulesServices/user.service';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { Dispatch } from 'redux';

export const fetchAndSetConnectedUser = async (dispatch: Dispatch) => {
	return getConnectedUser().then((res) => {
		const connectedUser = {
			id: res.data.data.id,
			fullName: res.data.data.fullName,
			email: res.data.data.email,
			avatar: res.data.data.avatar,
			role: res.data.data.role.name,
			oneSignalUserId: res.data.data.oneSignalUserId,
		};

		dispatch(setConnectedUser(connectedUser));
	});
};
