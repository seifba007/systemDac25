export enum ERole {
	HR = 'HR',
	USER = 'USER',
	ADMIN = 'ADMIN',
	TALENT = 'TALENT',
	EXPERT = 'EXPERT',
	CLIENT = 'CLIENT',
	EDUCATOR = 'EDUCATOR',
	SUPERADMIN = 'SUPERADMIN',
}

export type UserRole = ERole.CLIENT | ERole.USER;

export type RegisterEntity = {
	email: string;
	fullName: string;
	password: string;
	passwordConfirmation: string;
};

export type LoginEntity = {
	email: string;
	password: string;
};

export type ConfirmEmailEntity = {
	verificationCode: string;
	email: string;
};

export type EmailPreferenceType = {
	marketing: boolean;
	confirmation_updates: boolean;
	payments: boolean;
	projects_updates: boolean;
	job_application: boolean;
};
export type keysEmailPreference = keyof EmailPreferenceType;
export type UserEntity = {
	id: string;
	fullName: string;
	email: string;
	avatar: string | null;
	role: any;
	apps: any;
};

export type TokenSliceState = {
	accessToken: string;
	refreshToken: string;
};

export type ForgotPasswordData = {
	email: string;
	verificationCode: string;
};

export type AuthSliceStateEntity = {
	// TODO To be changed
	connectedUser?: UserEntity;
};
