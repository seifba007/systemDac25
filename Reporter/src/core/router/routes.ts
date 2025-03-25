// routes.ts
import React from 'react';
import { RoutesType } from '../entities/routes.entity';
import { PATHS } from './paths';
import authRoutes from './auth/routes';
import usermangmentRoutes from './dashbord/routes';

const Layout = React.lazy(() => import('@/presentation/app/dashboard/Layout'));
const RoutePaths: Array<RoutesType> = [
	...authRoutes,
	...usermangmentRoutes,
	{
		path: PATHS.FALLBACK,
		component: Layout,
		displayType: 'ALL',
		isPrivate: false,
	},
];

export default RoutePaths;
