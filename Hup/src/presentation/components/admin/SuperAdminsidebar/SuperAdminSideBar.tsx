import React, { useState } from 'react';
import { Box, Flex, Image, Avatar } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import data from '../../../../data/dataSidebar';
import logo from '../../../../assets/logo-dark.png'; // Full logo
import smollogo from '../../../../assets/smardac.png'; // Small logo

import { logout } from '@/core/services/modulesServices/auth.service';
import useResponsive from '@/presentation/shared/mediaQuery';
import { CloseCircle } from 'iconsax-react';

interface SuperAdminSideBarProps {
	adminName: string;
	onClose: () => void;
}

export const SuperAdminSideBar: React.FC<SuperAdminSideBarProps> = ({ adminName, onClose }) => {
	const { isMobile } = useResponsive();
	const [logoutModalOpened, setLogoutModalOpened] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);

	const openLogoutModal = () => {
		setLogoutModalOpened(true);
	};

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed); // Toggle the sidebar collapse state
	};

	const disabledLabels = ['Admins'];

	const links = data.map((item, index) => {
		if (item.section) {
			return (
				<div key={index} className={isCollapsed ? 'sectionnone' : 'section'}>
					{item.section}
				</div>
			);
		}
		const IconComponent = item.icon;
		const iconColor = item.label === 'Log out' ? '#F55757' : undefined;

		return item.link ? (
			item.label === 'Log out' ? (
				<div key={index} className={'linkside logOutLink'} onClick={openLogoutModal}>
					{IconComponent && (
						<span className={'linkIcon'}>
							<IconComponent
								stroke={1.5}
								variant='Bulk'
								color={iconColor}
								size={isCollapsed && isMobile ? 25 : 18}
							/>{' '}
							{/* Adjust size when collapsed and on mobile */}
						</span>
					)}
					{isCollapsed && <p className={'logoutext'}>{item.label}</p>}
				</div>
			) : item.link.includes('apploader/') ? (
				<NavLink
					to={disabledLabels.includes(item?.label || '') ? '#' : item.link?.toLowerCase()}
					className={({ isActive }) =>
						`linkside ${isCollapsed ? 'centered' : ''} ${
							isActive && !disabledLabels.includes(item?.label || '') ? 'active' : ''
						}`
					}
					key={index}
					onClick={() => {
						if (isMobile) {
							onClose();
						}
					}}
				>
					{
						<span className={'linkIcon'}>
							<Avatar
								src={
									'https://gravatar.com/avatar/a21aebba7c9109b1c0945a2075669c8d?s=400&d=robohash&r=x'
								}
								size={isCollapsed ? 25 : 23}
							/>{' '}
							{/* Adjust size when collapsed and on mobile */}
						</span>
					}
					{!isCollapsed && <p className={'textlink'}>{item.label}</p>}
				</NavLink>
			) : (
				<NavLink
					to={disabledLabels.includes(item?.label || '') ? '#' : item.link?.toLowerCase()}
					className={({ isActive }) =>
						`linkside ${isCollapsed ? 'centered' : ''} ${
							isActive && !disabledLabels.includes(item?.label || '') ? 'active' : ''
						}`
					}
					key={index}
					onClick={() => {
						if (isMobile) {
							onClose();
						}
					}}
				>
					{IconComponent && (
						<span className={'linkIcon'}>
							<IconComponent
								stroke={1.5}
								variant='Bulk'
								color={iconColor}
								size={isCollapsed ? 25 : 23}
							/>{' '}
							{/* Adjust size when collapsed and on mobile */}
						</span>
					)}
					{!isCollapsed && <p className={'textlink'}>{item.label}</p>}
				</NavLink>
			)
		) : null;
	});

	return (
		<Box className={`Sidenavbar ${isCollapsed ? 'collapsed' : ''}`}>
			<Box className={'SidenavbarMain'}>
				<Flex
					p={'1em'}
					justify={'center'}
					onClick={() => {
						if (isMobile) {
							onClose();
						}
					}}
				>
					{/* Conditionally render logo */}
					<Image
						src={isCollapsed ? smollogo : logo}
						w={'75%'}
						pb={isCollapsed ? '80%' : '5%'}
						onClick={toggleSidebar}
						className={isCollapsed ? 'shrunk' : ''}
						style={{ cursor: 'pointer' }}
					/>

					{isMobile && (
						<Box className='buttonham'>
							<CloseCircle size='20' variant='Bold' color='#6c757d' />
						</Box>
					)}
				</Flex>
				<hr className={'noneGroup'} />
				<Box className={'linkSection'}>{links}</Box>
			</Box>
		</Box>
	);
};
