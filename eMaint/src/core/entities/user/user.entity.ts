export type SendCodeEntity = {
	email: string;
};

export type ResetPasswordEntity = SendCodeEntity & {
	verificationCode: string;
	newPassword: string;
	confirmNewPassword: string;
};

export enum ECommitment {
	FULL_TIME = 'full-time',
	PART_TIME_MORNING = 'part-time-morning',
	PART_TIME_EVENING = 'part-time-evening',
	CUSTOM = 'custom',
}
// export type UserEntity = {
//     fullName: string;
//     email: string;
//     avatar: string;
//     role: ERole;
// }
export interface SuperAdminSliceStateEntity {
	id: string;
	phone: string;
	avatar: string;
	email: string;
	fullname: string;
}
