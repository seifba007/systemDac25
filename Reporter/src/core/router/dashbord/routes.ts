import { RoutesType } from '@/core/entities/routes.entity';
import React from 'react';
import { ADMIN } from './paths';

const Layout = React.lazy(() => import('@/presentation/app/dashboard/Layout'));
const workorders = React.lazy(() => import('@/presentation/components/admin/workorders/workorders'));
const Viewassets = React.lazy(() => import('@/presentation/components/admin/assetscomposent/Viewassets'));
const workorcreate = React.lazy(() => import('@/presentation/components/admin/workorders/workorderscreate/WorkordersCreate'));
const ActionItems = React.lazy(() => import('@/presentation/components/admin/actionitems/ActionItems'));
const Dashboard = React.lazy(() => import('@/presentation/components/admin/dashboard/Dashboard'));
const Apploader = React.lazy(() => import('@/presentation/components/admin/apploader/Apploader'));
const Spareparts = React.lazy(() => import('@/presentation/components/admin/spareparts/SparepartsMangment'));
const StoremaMagement = React.lazy(() => import('@/presentation/components/admin/spareparts/storemanagement/StoreManagement'));
const Procedures = React.lazy(() => import('@/presentation/components/admin/procedures/Procedures'));
const Documents = React.lazy(() => import('@/presentation/components/admin/procedures/documents/Documents'));
const Certification = React.lazy(() => import('@/presentation/components/admin/Certification/Certification'));
const CreateAssets = React.lazy(() => import('@/presentation/components/admin/assetscomposent/createassets/CreateAssets'));
const SpareCreate = React.lazy(() => import('@/presentation/components/admin/spareparts/createspare/SpareCreate'));
const BulkAdd = React.lazy(() => import('@/presentation/components/admin/spareparts/bulkadd/BulkAdd'));
const AddMProcedure = React.lazy(() => import('@/presentation/components/admin/procedures/addmaintenanceprocedure/AddMProcedure'));
const AddNewDocument = React.lazy(() => import('@/presentation/components/admin/procedures/addnewdocument/AddNewDocument'));
const AddlIncidentReporting = React.lazy(() => import('@/presentation/components/admin/incidentreporting/addlIncidentReporting/AddlIncidentReporting'));
const AddlMeetingReport = React.lazy(() => import('@/presentation/components/admin/incidentreporting/addlmeetingreport/AddlMeetingReport'));
const AddlRisk = React.lazy(() => import('@/presentation/components/admin/incidentreporting/addlRisk/AddlRisk'));
const HazopAnalysis = React.lazy(() => import('@/presentation/components/admin/incidentreporting/hazopanalysis/HazopAnalysis'));
const ViewReports = React.lazy(() => import('@/presentation/components/admin/viewreports/ViewReports'));
const MeetingReportsList = React.lazy(() => import('@/presentation/components/admin/viewreports/meetingreportslist/MeetingReportsList'));
const RiskAssessmentsList = React.lazy(() => import('@/presentation/components/admin/viewreports/riskAssessmentsList/RiskAssessmentsList'));
const HanzopAnalysisLst = React.lazy(() => import('@/presentation/components/admin/viewreports/hanzopanalysislst/HanzopAnalysisLst'));
const Certificates = React.lazy(() => import('@/presentation/components/admin/settingandsupport/Certificates'));
const Settings = React.lazy(() => import('@/presentation/components/admin/settingandsupport/Settings'));

const usermangmentRoutes: Array<RoutesType> = [
	{
		path: '/',
		component: Layout,
		displayType: 'ALL',
		isPrivate: false,
		children: [
			{
				
				path: ADMIN.ReportMeeting,
				component: Settings,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.Certificates,
				component: Certificates,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.HanzopAnalysisLst,
				component: HanzopAnalysisLst,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.RiskAssessmentsList,
				component: RiskAssessmentsList,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.MeetingReportsList,
				component: MeetingReportsList,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.ViewReports,
				component: ViewReports,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.HazopAnalysis,
				component: HazopAnalysis,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.AddlRisk,
				component: AddlRisk,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.AddlMeetingReport,
				component: AddlMeetingReport,
				displayType: 'ALL',
				isPrivate: false,
			}
			,
			{
				
				path: ADMIN.AddlIncidentReporting,
				component: AddlIncidentReporting,
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
				path: ADMIN.Certification,
				component: Certification ,
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
			{
				path: ADMIN.ActionItems,
				component: ActionItems,
				displayType: 'ALL',
				isPrivate: false,
			}
		],
	},
	
];

export default usermangmentRoutes;
