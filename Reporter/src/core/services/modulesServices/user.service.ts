import { UserEntity } from '@/core/entities/auth/authSlice.entity';
import { ResetPasswordEntity, SendCodeEntity } from '@/core/entities/user/user.entity';
import { CLIENT, EDUCATOR, EXPERT, TALENT, USER } from '../endPoint/user.endPoint';
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
export const updateUser = <T extends Partial<UserEntity>>(data: T) => {
	return RequestService.update({ entity: USER.USER_BASE_URL, data, method: 'patch' });
};
export const getConnectedverif= () => {
	return HttpService.getInstance().executeRequest({
		method: 'get',
		endPoint: USER.VERIF,
	});
};

export const sendCode = (data: SendCodeEntity) => {
	return RequestService.create({ entity: USER.SEND_CODE, data });
};

export const resetPassword = (data: ResetPasswordEntity) => {
	return RequestService.update({ entity: USER.RESET_PASSWORD, data });
};

//////////////////////////// Talent ////////////////////////////

export const updateTalentIds = (data: FormData) => {
	return RequestService.updateAndUpload({ entity: TALENT.CHECK_IDS, data });
};

export const getConnectedTalent = () => {
	return RequestService.read({ entity: TALENT.GET_CURRENT_TALENT });
};

export const addUserAvatar = (formData: FormData) => {
	return RequestService.createAndUpload({
		entity: USER.ADD_USER_AVATAR,
		data: formData,
	});
};

export const generateTalentPublicLink = () => {
	return RequestService.read({ entity: TALENT.GET_PUBLIC_LINK });
};

export const getTalentPublicProfile = (name: string, id: string) => {
	return RequestService.read({ entity: TALENT.GET_PUBLIC_PROFILE + `/${name}/${id}` });
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
