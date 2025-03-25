import React, { useState } from 'react';
import { Box, Flex, Menu, Text, rem } from '@mantine/core';
import { Call, Eye, Logout, MessageQuestion, Setting2 } from 'iconsax-react';
import PortfolioAvatar from '../avatar/ProtofolioAvatar';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmationModal } from '../modal';
import { logout } from '@/core/services/modulesServices/auth.service';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { Link } from 'react-router-dom';
import { ERole } from '@/core/entities/auth/authSlice.entity';

interface MenuItemProps {
	leftSection: React.ReactNode;
	children: React.ReactNode;
	onClick?: () => void;
}
const MenuItem = ({ leftSection, children, onClick }: MenuItemProps) => (
	<Menu.Item p={rem(16)} leftSection={leftSection} onClick={onClick}>
		<Text fz={rem(14)} lh={rem(16)}>
			{children}
		</Text>
	</Menu.Item>
);

const MenuBar = () => {
	const user = useAppSelector(selectConnectedUser);
	const currentUser = useAppSelector(selectConnectedUser);
	const [opened, { open, close }] = useDisclosure(false);
	const [isLoading, setIsLoading] = useState(false);
	const handleLogout = () => {
		setIsLoading(true);
		logout().finally(() => {
			setIsLoading(false);
		});
	};
	return (
		<>
			<Menu.Dropdown w={rem(280)} style={{ borderRadius: '12px' }}>
				<Menu.Item pt={rem(22)} pb={rem(24)} style={{ cursor: 'default' }}>
					<Flex align='center' gap={rem(8)}>
						<Box>
							<PortfolioAvatar width='2.5rem' />
						</Box>
						<Box>
							<Text fz={'0.875rem'} tt={'capitalize'}>
								{currentUser?.fullName}
							</Text>
							<Text fz={'0.75rem'} c='#7B7E84'>
								{currentUser?.role === 'TALENT'
									? 'Talent'
									: currentUser?.role === 'EDUCATOR'
										? 'Educator'
										: currentUser?.role === 'CLIENT'
											? 'Client'
											: null}
							</Text>
						</Box>
					</Flex>
				</Menu.Item>

				{user?.role === ERole.TALENT && (
					<Link to={'/portfolio'}>
						<MenuItem leftSection={<Eye size='16' color='#53545E' />}>View my profile</MenuItem>
					</Link>
				)}
				<Link to={'/settings'}>
					<MenuItem leftSection={<Setting2 size='16' color='#53545E' />}>
						<Text fz={13} ml={2}>
							Settings
						</Text>
					</MenuItem>
				</Link>
				<MenuItem leftSection={<MessageQuestion size='16' color='#53545E' />}>
					<Text fz={13} ml={2}>
						Help
					</Text>
				</MenuItem>
				<MenuItem leftSection={<Call size='16' color='#53545E' />}>
					<Text fz={13} ml={2}>
						Contact Support
					</Text>
				</MenuItem>
				<Menu.Divider />
				<MenuItem leftSection={<Logout size='16' color='#53545E' />} onClick={open}>
					Log Out
				</MenuItem>
			</Menu.Dropdown>
			<ConfirmationModal
				title='Log out from account?'
				subtitle='Are you certain that you want to log out?'
				opened={opened}
				close={close}
				handleConfirm={handleLogout}
				isLoading={isLoading}
				confirmText='Log Out'
			/>
		</>
	);
};

export default MenuBar;
