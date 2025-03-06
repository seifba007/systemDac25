import { UserEntity } from '@/core/entities/auth/authSlice.entity';
import { ResetPasswordEntity, SendCodeEntity } from '@/core/entities/user/user.entity';
import { CLIENT, EDUCATOR, EXPERT, USER } from '../endPoint/user.endPoint';
import HttpService from '../httpServices/http.service';
import RequestService from '../requestServices/request';
import { ListOptions } from '@/core/entities/http.entity';

export const getConnectedUser = () => {
	return HttpService.getInstance().executeRequest({
		method: 'get',
		endPoint: USER.GET_ME,
	});
};


export const getUsers = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity: USER.USERURL, options });
};

export const DeleteUsers= ({ id }: { id: string }) => {
	return RequestService.delete({ entity: USER.USERURL + `/${id}` });
};

export const updateUser = <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.updateAndUpload({
		entity: `${USER.USERURL}/${id}`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};


export const sendCode = (data: SendCodeEntity) => {
	return RequestService.create({ entity: USER.SEND_CODE, data });
};

export const resetPassword = (data: ResetPasswordEntity) => {
	return RequestService.create({ entity: USER.RESET_PASSWORD, data });
};

export const addUserAvatar = (formData: FormData) => {
	return RequestService.createAndUpload({
		entity: USER.ADD_USER_AVATAR,
		data: formData,
	});
};

//////////////////////////// Educator ////////////////////////////
export const getEducatorAccount = () => {
	return RequestService.read({ entity: EDUCATOR.EDUCATOR_CURRENT });
};

//////////////////////////// Expert ////////////////////////////
export const getConnectedExpert = () => {
	return RequestService.read({ entity: EXPERT.GET_CURRENT_EXPERT });
};

//////////////////////////// Client ////////////////////////////
export const getConnectedClient = () => {
	return RequestService.read({ entity: CLIENT.GET_CURRENT_CLIENT });
};
