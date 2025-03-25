import React, { useEffect } from 'react';
import './entryPoint.scss';
// import LoadingIndicator from '../shared/loadingIndicator/loadingIndicator';
import { ERole } from '@/core/entities/auth/authSlice.entity';
import { updateUser } from '@/core/services/modulesServices/user.service';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { Toaster } from 'react-hot-toast';
import OneSignal from 'react-onesignal';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useTrackDeviceWidth from '../../core/hooks/useTrackDeviceWidth';
import { PATHS } from '../../core/router/paths';
import routes from '../../core/router/routes';
import { routesRenderer } from '../../core/router/routesRenderer';
// import { useAppSelector } from '@/core/store/hooks';
// import { DashBoardSidebar } from '../components/sidebar';
// import { selectConnectedUser } from '@/core/store/modules/authSlice';

const EntryPoint = () => {
	// Custom hook to track device width
	useTrackDeviceWidth();
	const user = useAppSelector(selectConnectedUser);

	useEffect(() => {
		const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
		if (user && user.role && appId) {
			(async () => {
				await OneSignal.init({
					appId: appId,
					notifyButton: {
						enable: true,
					},
				});

				OneSignal.User.addTag('user_role', user.role as ERole);
			})();
		}
	}, [user]);

	return (
		<div>
			<Toaster />
			{/* <LoadingIndicator /> */}
			<BrowserRouter>
				{/* {user ? <DashBoardSidebar /> : null} */}
				<Routes>
					{/* This will take care of rendering your routes you just need to set up the routes.ts file */}
					{routesRenderer(routes)}
					{/*  */}
					<Route path={'*'} element={<Navigate to={PATHS.FALLBACK} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default EntryPoint;
