import React from 'react';
import { ERole } from './auth/authSlice.entity';

type DisplayType = 'MOBILE' | 'TABLET' | 'DESKTOP' | 'ALL';

export type RoutesType = {
	path: string;
	isPrivate: boolean;
	displayType: DisplayType;
	role?: ERole[];
	component: React.LazyExoticComponent<() => JSX.Element>;
	// Below are needed for nested routes
	children?: Array<RoutesType>;
	fallback?: string;
	//
};
