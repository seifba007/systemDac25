import { RoutesType } from '@/core/entities/routes.entity';
import React from 'react';
import { ADMIN } from './paths';

const Layout = React.lazy(() => import('@/presentation/app/dashboard/Layout'));
const ActionItems = React.lazy(
	() => import('@/presentation/components/admin/actionitems/ActionItems'),
);
const Dashboard = React.lazy(() => import('@/presentation/components/admin/dashboard/Dashboard'));
const Apploader = React.lazy(() => import('@/presentation/components/admin/apploader/Apploader'));

const Certification = React.lazy(
	() => import('@/presentation/components/admin/Certification/Certification'),
);

const AddlIncidentReporting = React.lazy(
	() =>
		import(
			'@/presentation/components/admin/incidentreporting/addlIncidentReporting/AddlIncidentReporting'
		),
);
const AddlMeetingReport = React.lazy(
	() =>
		import('@/presentation/components/admin/incidentreporting/addlmeetingreport/AddlMeetingReport'),
);
const AddlRisk = React.lazy(
	() => import('@/presentation/components/admin/incidentreporting/addlRisk/AddlRisk'),
);
const HazopAnalysis = React.lazy(
	() => import('@/presentation/components/admin/incidentreporting/hazopanalysis/HazopAnalysis'),
);
const ViewReports = React.lazy(
	() => import('@/presentation/components/admin/viewreports/ViewReports'),
);
const MeetingReportsList = React.lazy(
	() => import('@/presentation/components/admin/viewreports/meetingreportslist/MeetingReportsList'),
);
const RiskAssessmentsList = React.lazy(
	() =>
		import('@/presentation/components/admin/viewreports/riskAssessmentsList/RiskAssessmentsList'),
);
const HanzopAnalysisLst = React.lazy(
	() => import('@/presentation/components/admin/viewreports/hanzopanalysislst/HanzopAnalysisLst'),
);
const Certificates = React.lazy(
	() => import('@/presentation/components/admin/settingandsupport/Certificates'),
);
const Settings = React.lazy(
	() => import('@/presentation/components/admin/settingandsupport/Settings'),
);

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
			},
			{
				path: ADMIN.Certificates,
				component: Certificates,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.HanzopAnalysisLst,
				component: HanzopAnalysisLst,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.RiskAssessmentsList,
				component: RiskAssessmentsList,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.MeetingReportsList,
				component: MeetingReportsList,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.ViewReports,
				component: ViewReports,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.HazopAnalysis,
				component: HazopAnalysis,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.AddlRisk,
				component: AddlRisk,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.AddlMeetingReport,
				component: AddlMeetingReport,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.AddlIncidentReporting,
				component: AddlIncidentReporting,
				displayType: 'ALL',
				isPrivate: false,
			},

			{
				path: ADMIN.Certification,
				component: Certification,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.Apploader,
				component: Apploader,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: '/',
				component: Dashboard,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.Dashboard,
				component: Dashboard,
				displayType: 'ALL',
				isPrivate: false,
			},
			{
				path: ADMIN.ActionItems,
				component: ActionItems,
				displayType: 'ALL',
				isPrivate: false,
			},
		],
	},
];

export default usermangmentRoutes;
