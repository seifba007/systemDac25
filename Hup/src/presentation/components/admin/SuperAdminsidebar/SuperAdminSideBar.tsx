import React, { useMemo, useState } from 'react';
import { Box, Flex, Image, Avatar } from '@mantine/core';
import { NavLink, To, useLocation } from 'react-router-dom';
import data from '../../../../data/dataSidebar';
import logo from '../../../../assets/logo-dark.png'; // Full logo
import smollogo from '../../../../assets/smardac.png'; // Small logo
import { CloseCircle } from 'iconsax-react';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import useResponsive from '@/presentation/shared/mediaQuery';

// Define interfaces
interface SidebarItem {
	section?: string;
	label?: string;
	link?: string;
	icon?: React.ComponentType<{ stroke?: number; variant?: string; color?: string; size?: number }>;
}

interface App {
	app: string;
	licenseNbr: number;
	accessType: string;
	isActive: boolean;
	categories: string[];
	tags: string[];
	path: string;
	description: string;
	logo: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface User {
	id: string;
	email: string;
	fullName: string;
	role: string;
	organization?: { availableApps: App[] } | null;
	picture?: string;
	active?: boolean;
	suspended?: boolean;
	apps?: App[];
}

interface SuperAdminSideBarProps {
	adminName: string;
	onClose: () => void;
}

const isValidReactElement = (item: React.ReactNode): item is React.ReactElement =>
	React.isValidElement(item) || item === null || item === false;

export const SuperAdminSideBar: React.FC<SuperAdminSideBarProps> = ({ adminName, onClose }) => {
	const { isMobile } = useResponsive();
	const [logoutModalOpened, setLogoutModalOpened] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const user = useAppSelector(selectConnectedUser) as User | undefined | null;
	const location = useLocation();

	const availableApps: App[] = user?.apps || [];
	const openLogoutModal = () => setLogoutModalOpened(true);
	const toggleSidebar = () => setIsCollapsed(!isCollapsed);
	const disabledLabels: string[] = ['Admins'];

	// Static links
	const staticLinks = useMemo(
		() =>
			data.map((item: SidebarItem, index: number) => {
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
						<div key={index} className='linkside logOutLink' onClick={openLogoutModal}>
							{IconComponent && (
								<span className='linkIcon'>
									<IconComponent
										stroke={1.5}
										variant='Bulk'
										color={iconColor}
										size={isCollapsed && isMobile ? 25 : 18}
									/>
								</span>
							)}
							{isCollapsed && <p className='logoutext'>{item.label}</p>}
						</div>
					) : (
						<NavLink
							to={
								disabledLabels.includes(item.label || '') ? '#' : (item.link?.toLowerCase() as To)
							}
							className={({ isActive }) =>
								`linkside ${isCollapsed ? 'centered' : ''} ${
									isActive && !disabledLabels.includes(item.label || '') ? 'active' : ''
								}`
							}
							key={index}
							onClick={() => isMobile && onClose()}
						>
							{IconComponent && (
								<span className='linkIcon'>
									<IconComponent
										stroke={1.5}
										variant='Bulk'
										color={iconColor}
										size={isCollapsed ? 25 : 23}
									/>
								</span>
							)}
							{!isCollapsed && <p className='textlink'>{item.label}</p>}
						</NavLink>
					)
				) : null;
			}),
		[isCollapsed, isMobile, onClose],
	);

	// App links using NavLink's built-in isActive
	const appLinks = useMemo(
		() =>
			availableApps.map((app: App, index: number) => {
				const linkPath = `/apploader/${app.path.replace(/^https?:\/\//, '')}` || '#';
				const isActiveLink = location.pathname == linkPath;

				return (
					<NavLink
						to={linkPath}
						className={({ isActive }) =>
							`linkside ${isCollapsed ? 'centered' : ''} ${isActiveLink ? 'active' : ''}`
						}
						key={`app-${index}`}
						onClick={() => isMobile && onClose()}
					>
						<span className='linkIcon'>
							<Avatar src={app.logo} size={isCollapsed ? 25 : 23} radius={0} />
						</span>
						{!isCollapsed && <p className='textlink'>{app.name || 'Unnamed App'}</p>}
					</NavLink>
				);
			}),
		[availableApps, isCollapsed, isMobile, onClose, location.pathname],
	);

	// Combined links
	const links = useMemo(
		() =>
			[
				availableApps.length > 0 && (
					<div key='demo-apps-section' className={isCollapsed ? 'sectionnone' : 'section'}>
						Demo Apps
					</div>
				),
				...appLinks,
				...staticLinks,
			].filter(isValidReactElement),
		[appLinks, staticLinks, availableApps.length, isCollapsed],
	);

	return (
		<Box className={`Sidenavbar ${isCollapsed ? 'collapsed' : ''}`}>
			<Box className='SidenavbarMain'>
				<Flex p='1em' justify='center' align='center'>
					<Image
						src={isCollapsed ? smollogo : logo}
						w='75%'
						pb={isCollapsed ? '80%' : '5%'}
						onClick={toggleSidebar}
						className={isCollapsed ? 'shrunk' : ''}
						style={{ cursor: 'pointer' }}
					/>
					{isMobile && (
						<Box className='buttonham' onClick={onClose}>
							<CloseCircle size='20' variant='Bold' color='#6c757d' />
						</Box>
					)}
				</Flex>
				<hr className='noneGroup' />
				<Box className='linkSection'>{links}</Box>
			</Box>
			{logoutModalOpened && <div>Logout Modal Placeholder</div>}
		</Box>
	);
};

export default SuperAdminSideBar;
