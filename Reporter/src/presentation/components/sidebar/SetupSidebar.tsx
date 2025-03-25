import React from 'react';
import { Icons } from '@/assets/icons/Icons';
import { Link } from 'react-router-dom';

interface SetupSidebarProps {
	title: string;
	parg: string;
	children: React.ReactNode;
}
const SetupSidebar = ({ title, parg, children }: SetupSidebarProps) => {
	return (
		<aside className='sidebar white'>
			<section>
				<Link to={'/'}>
					<Icons.whiteLogo className='logo' width={108} />
				</Link>
				<h1>{title}</h1>
				<p>{parg}</p>
				{children}
			</section>
		</aside>
	);
};

export default SetupSidebar;
