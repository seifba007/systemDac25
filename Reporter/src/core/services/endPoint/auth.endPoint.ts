import { BASE_URL } from '../endpoints';

const AUTH_BASE_URL = `${BASE_URL}/auth`;

const SUPERADMIN_REGISTER = `${AUTH_BASE_URL}/superadmin/register`;
const ADMIN_REGISTER = `${AUTH_BASE_URL}/admin/register`;
const REGISTER = `${AUTH_BASE_URL}/register`;
const CONFIRM_EMAIL = `${AUTH_BASE_URL}/confirmemail`;
const VERIFY_CODE = `${AUTH_BASE_URL}/verifycode`;
const LOGIN = `${AUTH_BASE_URL}/login`;
const REFRESH_TOKEN = `${AUTH_BASE_URL}/refresh`;
const LOGOUT = `${AUTH_BASE_URL}/logout`;
const REGISTER_WTIH_GOOGLE = `${AUTH_BASE_URL}/register/google`;
const LOGIN_WITH_GOOGLE = `${AUTH_BASE_URL}/login/google`;

export {
	SUPERADMIN_REGISTER,
	ADMIN_REGISTER,
	REGISTER,
	CONFIRM_EMAIL,
	LOGIN,
	REFRESH_TOKEN,
	LOGOUT,
	REGISTER_WTIH_GOOGLE,
	LOGIN_WITH_GOOGLE,
	VERIFY_CODE,
};
