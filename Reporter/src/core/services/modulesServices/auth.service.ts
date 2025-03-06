import RequestService from '../requestServices/request';
import HttpService from '../httpServices/http.service';
import {
	CONFIRM_EMAIL,
	REGISTER,
	LOGIN,
	REGISTER_WTIH_GOOGLE,
	LOGIN_WITH_GOOGLE,
	VERIFY_CODE,
} from '../endPoint/auth.endPoint';
import {
	ConfirmEmailEntity,
	LoginEntity,
	RegisterEntity,
	UserRole,
} from '@/core/entities/auth/authSlice.entity';

export const register = (data: RegisterEntity) => {
	return RequestService.create({ entity: REGISTER, data });
};

export const login = (data: LoginEntity) => {
	return RequestService.create({ entity: LOGIN, data });
};

export const confirmEmail = (data: ConfirmEmailEntity) => {
	return RequestService.create({ entity: CONFIRM_EMAIL, data });
};

export const verifyCode = (data: ConfirmEmailEntity) => {
	return RequestService.create({ entity: VERIFY_CODE, data });
};
export const registerWithGoogle = (role: UserRole, idToken: string) => {
	return HttpService.getInstance().executeRequest(
		{
			method: 'post',
			endPoint: REGISTER_WTIH_GOOGLE,
			data: { role },
		},
		idToken,
	);
};

export const loginWithGoogle = (idToken: string) => {
	return HttpService.getInstance().executeRequest(
		{
			method: 'post',
			endPoint: LOGIN_WITH_GOOGLE,
		},
		idToken,
	);
};

export const logout = () => {
	return HttpService.getInstance().logout();
};
