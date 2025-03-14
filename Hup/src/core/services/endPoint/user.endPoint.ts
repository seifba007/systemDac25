import { BASE_URL } from '../endpoints';

const USER_BASE_URL = `${BASE_URL}/auth/user`;
const USERURL = `${BASE_URL}/users`;

const GET_ME = `${USER_BASE_URL}`;
const SEND_CODE = `${BASE_URL}/auth/forgot-password`;
const RESET_PASSWORD = `${BASE_URL}/auth/reset-password`;
const DELETE_USER = `${USER_BASE_URL}/:id`;
const UPDATE_USER = `${USER_BASE_URL}/:id`;
const ADD_USER_AVATAR = `${USERURL}/avatar`;
const UPDATE_ACCESS= `${USERURL}/update_access`;
export const USER = {
	USERURL,
	USER_BASE_URL,
	GET_ME,
	SEND_CODE,
	UPDATE_ACCESS,
	RESET_PASSWORD,
	DELETE_USER,
	UPDATE_USER,
	ADD_USER_AVATAR,
};

const EXPERT_BASE_URL = `${BASE_URL}/expert`;
const GET_CURRENT_EXPERT = `${EXPERT_BASE_URL}/current`;

export const EXPERT = {
	EXPERT_BASE_URL,
	GET_CURRENT_EXPERT,
};

const EDUCATOR_BASE_URL = `${BASE_URL}/educator`;
const EDUCATOR_CURRENT = `${EDUCATOR_BASE_URL}/current`;

export const EDUCATOR = {
	EDUCATOR_BASE_URL,
	EDUCATOR_CURRENT,
};

const CLIENT_BASE_URL = `${BASE_URL}/client`;
const GET_CURRENT_CLIENT = `${CLIENT_BASE_URL}`;

export const CLIENT = {
	GET_CURRENT_CLIENT,
	CLIENT_BASE_URL,
};
