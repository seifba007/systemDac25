import React from 'react';
import { Flex, Image } from '@mantine/core';
import img1 from '../../../assets/pr1.png';

interface SetupSidebarProps {
	title: string;
	parg: string;
	children: React.ReactNode;
}
const SetupSidebar = ({ title, parg, children }: SetupSidebarProps) => {
	return (
		<aside className='sidebar white'>
			<section>
				<Flex justify={'center'} mb={'2em'} mr={'5em'}>
					<Image src={img1} className='logo' w={'200px'} />
				</Flex>
				<h1>{title}</h1>
				<p>{parg}</p>
				{children}
			</section>
		</aside>
	);
};

export default SetupSidebar;
