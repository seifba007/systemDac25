import LoadingIndicator from '@/presentation/shared/loadingIndicator/loadingIndicator';
import React, { useEffect } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../../utils/deviceBreakPoints';
import { RoutesType } from '../entities/routes.entity';
import { getConnectedUser } from '../services/modulesServices/user.service';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectConnectedUser, setConnectedUser } from '../store/modules/authSlice';
import { selectDeviceWidth } from '../store/modules/rootSlice';
import { selectAccessToken } from '../store/modules/tokenSlice';
import { PATHS } from './paths';

export const routesRenderer = (routesList: Array<RoutesType>) => {
	return routesList.map((_: RoutesType, _index: number) => (
		<Route key={_index} path={_.path} element={<RouteMiddleware _={_} />}>
			{_.children && routesRenderer(_.children)}
			{_?.fallback && _.children && _.children.length > 0 && (
				<>
					<Route path={_.path} element={<Navigate to={_.fallback} />} />
					<Route path={'*'} element={<Navigate to={_.fallback} />} />
				</>
			)}
		</Route>
	));
};

type Props = {
	_: RoutesType;
};

const RouteMiddleware = ({ _ }: Props) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const connectedUser = useAppSelector(selectConnectedUser);
	const width = useAppSelector(selectDeviceWidth);
	const token = useAppSelector(selectAccessToken);
	const [passport, setPassport] = React.useState({
		requestIsFinished: false,
		userIsConnected: false,
	});
	useEffect(() => {
		if (_.isPrivate) {
			if (!!connectedUser && !!token) {
				if (_.role && _.role.includes(connectedUser.role)) {
					setPassport({
						requestIsFinished: true,
						userIsConnected: true,
					});
				} else {
					setPassport({
						requestIsFinished: true,
						userIsConnected: true,
					});
				}
			} else if (!connectedUser && !!token) {
				getConnectedUser()
					.then((res) => {
						const emailPreference = res.data.data.emailPreference;
						dispatch(
							setConnectedUser({
								id: res.data.data.id,
								fullName: res.data.data.fullName,
								avatar: res.data.data.avatar,
								email: res.data.data.email,
								role: res.data.data.role.name,
							}),
						);
						//
						setPassport({
							requestIsFinished: true,
							userIsConnected: true,
						});
					})
					.catch(() => {
						setPassport({
							requestIsFinished: true,
							userIsConnected: false,
						});
					});
			} else if (!token) {
				setPassport({
					requestIsFinished: true,
					userIsConnected: false,
				});
			}
		}
	}, [location, token, _.isPrivate, _.role, connectedUser, dispatch]);

	const checkWidth = () => {
		let condition: boolean;
		switch (_.displayType) {
			case 'MOBILE':
				condition = width <= MOBILE_BREAKPOINT;
				break;
			case 'TABLET':
				condition = width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT;
				break;
			case 'DESKTOP':
				condition = width > TABLET_BREAKPOINT;
				break;
			case 'ALL':
			default:
				condition = true;
		}

		return condition;
	};

	const getElement = () => {
		return checkWidth() ? (
			<React.Suspense fallback={<LoadingIndicator />}>
				{React.createElement(_.component)}
			</React.Suspense>
		) : (
			escapeRoute()
		);
	};

	const escapeRoute = () => {
		return <Navigate to={_.fallback ? _.fallback : PATHS.FALLBACK} />;
	};

	return (
		<div>
			{!_.isPrivate
				? getElement()
				: passport.requestIsFinished && (
						<div>{passport.userIsConnected ? getElement() : escapeRoute()}</div>
				  )}
		</div>
	);
};
