import { RoutesType } from '@/core/entities/routes.entity';
import React from 'react';
import { AUTH_PATHS } from './paths';

const Login = React.lazy(() => import('@/presentation/app/auth/login/index'));
const Register = React.lazy(() => import('@/presentation/app/auth/register/index'));
const ForgotPassword = React.lazy(() => import('@/presentation/app/auth/forgot-password/index'));
const authRoutes: Array<RoutesType> = [
	{
		path: AUTH_PATHS.LOGIN,
		component: Login,
		displayType: 'ALL',
		isPrivate: false,
	},
	{
		path: AUTH_PATHS.REGISTER,
		component: Register,
		displayType: 'ALL',
		isPrivate: false,
	},
	{
		path: AUTH_PATHS.FORGOT_PASSWORD,
		component: ForgotPassword,
		displayType: 'ALL',
		isPrivate: false,
	},
];

export default authRoutes;
