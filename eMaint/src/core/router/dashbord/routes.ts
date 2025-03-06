import { RoutesType } from '@/core/entities/routes.entity';
import React from 'react';
import { ADMIN } from './paths';

const Layout = React.lazy(() => import('@/presentation/app/dashboard/Layout'));
const workorders = React.lazy(() => import('@/presentation/components/admin/workorders/workorders'));
const Viewassets = React.lazy(() => import('@/presentation/components/admin/assetscomposent/Viewassets'));
const workorcreate = React.lazy(() => import('@/presentation/components/admin/workorders/workorderscreate/WorkordersCreate'));
const Dashboard = React.lazy(() => import('@/presentation/components/admin/dashboard/Dashboard'));
const Apploader = React.lazy(() => import('@/presentation/components/admin/apploader/Apploader'));
const Spareparts = React.lazy(() => import('@/presentation/components/admin/spareparts/SparepartsMangment'));
const StoremaMagement = React.lazy(() => import('@/presentation/components/admin/spareparts/storemanagement/StoreManagement'));
const Procedures = React.lazy(() => import('@/presentation/components/admin/procedures/Procedures'));
const Documents = React.lazy(() => import('@/presentation/components/admin/procedures/documents/Documents'));
const Locations = React.lazy(() => import('@/presentation/components/admin/locations/Locations'));
const Suppliers = React.lazy(() => import('@/presentation/components/admin/locations/suppliersmanagement/SuppliersManagement'));
const CreateAssets = React.lazy(() => import('@/presentation/components/admin/assetscomposent/createassets/CreateAssets'));
const SpareCreate = React.lazy(() => import('@/presentation/components/admin/spareparts/createspare/SpareCreate'));
const BulkAdd = React.lazy(() => import('@/presentation/components/admin/spareparts/bulkadd/BulkAdd'));
const AddMProcedure = React.lazy(() => import('@/presentation/components/admin/procedures/addmaintenanceprocedure/AddMProcedure'));
const AddNewDocument = React.lazy(() => import('@/presentation/components/admin/procedures/addnewdocument/AddNewDocument'));
const AddLocations = React.lazy(() => import('@/presentation/components/admin/locations/addlocations/AddLocations'));
const AddSupplier = React.lazy(() => import('@/presentation/components/admin/locations/addsupplier/AddSupplier'));

const usermangmentRoutes: Array<RoutesType> = [
	{
		path: '/',
		component: Layout,
		displayType: 'ALL',
		isPrivate: false,
		children: [
			
			{
				
				path: ADMIN.AddSupplier,
				component: AddSupplier,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.AddLocations,
				component: AddLocations,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.AddNewDocument,
				component: AddNewDocument,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.AddMProcedure,
				component: AddMProcedure,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.BulkAdd,
				component: BulkAdd,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.CreateSpare,
				component: SpareCreate,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.CreateAssets,
				component: CreateAssets,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Suppliers,
				component: Suppliers,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Locations,
				component: Locations,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Documents,
				component: Documents,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Procedures,
				component: Procedures,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Apploader,
				component: Apploader,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Storemanagement,
				component: StoremaMagement,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.Sparepart,
				component: Spareparts,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: '/',
				component:  Dashboard,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.Dashboard,
				component: Dashboard,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				path: ADMIN.work,
				component: workorders,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.workcreate,
				component: workorcreate,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.ViewAssets,
				component: Viewassets,
				displayType: 'ALL',
				isPrivate: false,
			},
		
		],
	},
	
];

export default usermangmentRoutes;
