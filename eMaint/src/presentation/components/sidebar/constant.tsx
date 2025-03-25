import React from 'react';
import { Calendar, Chart, Notepad2, Profile2User, Setting2, Ticket2, Verify } from 'iconsax-react';
import { ERole } from '@/core/entities/auth/authSlice.entity';

export const sidebarOptions = {
	[ERole.TALENT]: [
		// { text: 'Home', icon: <Home2 size='22' color='#fff' />, link: '/home' },
		{ text: 'Calendar', icon: <Calendar size='22' color='#fff' />, link: '/calendar' },
		{ text: 'Analytics', icon: <Chart size='22' color='#fff' />, link: '/analytics' },
		// { text: 'Projects', icon: <Briefcase size='22' color='#fff' />, link: '/projects' },
		// { text: 'Wallet', icon: <Wallet2 size='22' color='#fff' />, link: '/wallet' },
		{ text: 'Courses', icon: <Notepad2 size='22' color='#fff' />, link: '/courses/all-courses/1' },
		{ text: 'Tickets', icon: <Ticket2 size='22' color='#fff' />, link: '/tickets' },
		{ text: 'Badges', icon: <Verify size='22' color='#fff' />, link: '/badges/explore' },
		{ text: 'Settings', icon: <Setting2 size='22' color='#fff' />, link: '/settings' },
	],
	[ERole.EDUCATOR]: [
		// { text: 'Home', icon: <Home2 size='22' color='#fff' />, link: '/home' },
		{ text: 'Badges', icon: <Verify size='22' color='#fff' />, link: '/badges/explore' },
		{ text: 'Courses', icon: <Notepad2 size='22' color='#fff' />, link: '/courses/all-courses/1' },
		{ text: 'Settings', icon: <Setting2 size='22' color='#fff' />, link: '/settings' },
	],
	[ERole.EXPERT]: [
		// { text: 'Home', icon: <Home2 size='22' color='#fff' />, link: '/home' },
		{ text: 'Calendar', icon: <Calendar size='22' color='#fff' />, link: '/calendar' },
		{
			text: 'Technical Tests',
			icon: <Notepad2 size='22' color='#fff' />,
			link: '/technical-tests/explore/1',
		},
		{
			text: 'Candidates',
			icon: <Profile2User size='22' color='#fff' />,
			link: '/candidates/all-candidates/1',
		},
		{ text: 'Settings', icon: <Setting2 size='22' color='#fff' />, link: '/settings' },
	],
};
