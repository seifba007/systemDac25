import { Bag, Category, MedalStar, Setting2, User } from 'iconsax-react';

import React from 'react';

// Define the NavItem interface
interface NavItem {
	id: number;
	section?: string;
	link?: string;
	label?: string;
	icon?: React.ComponentType<any>; // Icon is a React component
}

// Define the data array
const data: NavItem[] = [
	{ id: 1, section: 'Corporate Apps' },
	{ id: 7, section: 'Demo Apps' },
	{
		id: 2,
		link: 'apploader',
		label: 'app seif',
	},
	{ id: 14, section: 'Admin Setting' },
	{ id: 3, link: 'Dashboard', label: 'Dashboard', icon: Category }, // Fixed duplicate ID
	{ id: 15, link: 'User-Management', label: 'User Management', icon: User },
	{
		id: 16,
		link: 'Organization-Management',
		label: 'Organization Management',
		icon: Setting2,
	},
	{ id: 17, link: 'Apps-Management', label: 'Apps Management', icon: Bag },
	{
		id: 18,
		link: 'Licenses-Management',
		label: 'Licenses Management',
		icon: MedalStar,
	},
];

export default data;
export type { NavItem };
