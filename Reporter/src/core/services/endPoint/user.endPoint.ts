import { BASE_URL } from '../endpoints';

const USER_BASE_URL = `${BASE_URL}/user`;

const GET_ME = `${USER_BASE_URL}`;
const SEND_CODE = `${USER_BASE_URL}/sendcode`;
const RESET_PASSWORD = `${USER_BASE_URL}/reset_password`;
const DELETE_USER = `${USER_BASE_URL}/:id`;
const UPDATE_USER = `${USER_BASE_URL}/:id`;
const ADD_USER_AVATAR = `${USER_BASE_URL}/avatar`;
const VERIF = `${BASE_URL}/auth/verify-token`;

export const USER = {
	USER_BASE_URL,
	GET_ME,
	SEND_CODE,
	VERIF,
	RESET_PASSWORD,
	DELETE_USER,
	UPDATE_USER,
	ADD_USER_AVATAR,
};

const TALENT_BASE_URL = `${BASE_URL}/talent`;
const GET_CURRENT_TALENT = `${TALENT_BASE_URL}/current`;
const GET_PUBLIC_LINK = `${BASE_URL}/public/talent/link`;
const GET_PUBLIC_PROFILE = `${BASE_URL}/public/talent/profile`;
const CHECK_IDS = `${TALENT_BASE_URL}/ids`;

export const TALENT = {
	TALENT_BASE_URL,
	GET_CURRENT_TALENT,
	GET_PUBLIC_LINK,
	GET_PUBLIC_PROFILE,
	CHECK_IDS,
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
