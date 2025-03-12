import { RoutesType } from '@/core/entities/routes.entity';
import React from 'react';
import { ADMIN } from './paths';

const Layout = React.lazy(() => import('@/presentation/app/dashboard/Layout'));
const UsermangmentRoute = React.lazy(
	() => import('@/presentation/components/admin/usermangment/UserMangment'),
);
const Organization = React.lazy(
	() => import('@/presentation/components/admin/organization/Organization'),
);
const Apps = React.lazy(
	() => import('@/presentation/components/admin/apps_management/Apps_Management'),
);
const Licenses = React.lazy(() => import('@/presentation/components/admin/licenses/Licenses'));
const Dashboard = React.lazy(() => import('@/presentation/components/admin/dashboard/Dashboard'));
const Apploader = React.lazy(() => import('@/presentation/components/admin/apploader/Apploader'));
const AccountInformation = React.lazy(
	() => import('@/presentation/components/admin/accountinformation/AccountInformation'),
);

const usermangmentRoutes: Array<RoutesType> = [
	{
		path: '/',
		component: Layout,
		displayType: 'ALL',
		isPrivate: true,
		role: '4',
		children: [
			{
				path: ADMIN.AccountInformation,
				component: AccountInformation,
				displayType: 'ALL',
				isPrivate: true,
				role: '4',
			},
			{
				path: ADMIN.Apploader,
				component: Apploader,
				displayType: 'ALL',
				isPrivate: true,
				role: '4',
			},
			{
				path: ADMIN.User,
				component: UsermangmentRoute,
				displayType: 'ALL',
				role: '4',
				isPrivate: true,
			},

			{
				path: '/',
				component: Dashboard,
				displayType: 'ALL',
				isPrivate: true,
				role: '4',
			},
			{
				path: ADMIN.Apps,
				component: Apps,
				displayType: 'ALL',
				isPrivate: true,
				role: '4',
			},
			{
				path: ADMIN.Organization,
				component: Organization,
				displayType: 'ALL',
				isPrivate: true,
				role: '4',
			},
			{
				path: ADMIN.Licenses,
				component: Licenses,
				displayType: 'ALL',
				isPrivate: true,
				role: '4',
			},
		],
	},
];

export default usermangmentRoutes;
